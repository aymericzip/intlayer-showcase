import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import ProjectModel, { type IProject } from "@/models/Project";
import { getFaviconUrl } from "@/utils/getFaviconUrl";
import { connectGithub } from "@/utils/github/connectGithub";
import { connectDB } from "@/utils/mongoDB/connectDB";
import { submitProjectSchema } from "./projectSchema";
import { saveProject } from "./saveProject";
import { scanProject } from "./scanProject";
import { takeScreenshot } from "./takeScreenshot";
import type { Project } from "./types";
import { uploadScreenshot } from "./uploadScreenshot";
import { verifyGithub } from "./verifyGithub";

// Remove unused SubmissionResponse
type SubmitProjectInput = z.infer<typeof submitProjectSchema>;

const getProjectsSchema = z.object({
	page: z.number().optional().default(1),
	pageSize: z.number().optional().default(20),
	search: z.string().optional().default(""),
	selectedUseCases: z.array(z.string()).optional().default([]),
	isOpenSource: z.boolean().optional().default(false),
});

type GetProjectsInput = z.infer<typeof getProjectsSchema>;

export const submitProject = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => submitProjectSchema.parse(data))
	.handler(async function* ({ data }: { data: SubmitProjectInput }) {
		try {
			console.log("[submitProjectAction] Starting submission for", data.url);
			yield { step: "START" };

			await connectDB();
			console.log("[submitProjectAction] Connected to DB");

			await connectGithub();
			console.log("[submitProjectAction] Connected to Github");

			const result = submitProjectSchema.safeParse(data);
			if (!result.success) {
				console.warn(
					"[submitProjectAction] Validation failed",
					result.error.issues,
				);
				const message = result.error.issues
					.map((e) => `${e.path.join(".")}: ${e.message}`)
					.join(", ");

				yield { step: "ERROR", message: `Validation failed: ${message}` };
				return;
			}

			const validatedData = result.data;

			const existingProject = await ProjectModel.findOne({
				websiteUrl: validatedData.url,
			});

			if (existingProject) {
				console.warn(
					"[submitProjectAction] Project already exists",
					validatedData.url,
				);
				console.log("[submitProjectAction] Yielding error to client...");
				yield {
					step: "ERROR",
					message: "A project with this URL has already been submitted.",
				};
				return;
			}

			console.log(
				"[submitProjectAction] Starting bundle verification and scanning...",
			);
			yield { step: "SCANNING_START" };
			const scanResult = await scanProject(validatedData.url);

			if (
				!scanResult.intlayerVersion &&
				!scanResult.libsUsed.includes("intlayer")
			) {
				console.warn(
					"[submitProjectAction] Bundle verification failed for",
					validatedData.url,
				);
				yield {
					step: "ERROR",
					message:
						"The URL does not seem to contain a valid Intlayer application. Ensure Intlayer is installed and deployed.",
				};
				return;
			}
			yield { step: "SCANNING_SUCCESS" };

			let isOpenSource = false;
			let githubUrl = validatedData.githubUrl;

			if (githubUrl) {
				console.log("[submitProjectAction] Starting Github verification...");
				yield { step: "VERIFY_GITHUB_START" };
				const isIntlayerRepo = await verifyGithub({ githubUrl });

				if (isIntlayerRepo) {
					isOpenSource = true;
					console.log(
						"[submitProjectAction] Github verification successful for",
						githubUrl,
					);
				} else {
					console.warn(
						"[submitProjectAction] Github verification failed for",
						githubUrl,
					);
					githubUrl = undefined;
				}
				yield { step: "VERIFY_GITHUB_SUCCESS" };
			}

			console.log("[submitProjectAction] Starting DB_SCREENSHOT_START");
			yield { step: "DB_SCREENSHOT_START" };

			const logoUrl = getFaviconUrl(validatedData.url);
			const screenshotBuffer = await takeScreenshot(validatedData.url);
			const imageUrl = await uploadScreenshot(screenshotBuffer);

			console.log("[submitProjectAction] Saving to DB...");

			const newProject = await saveProject({
				title: validatedData.name,
				description: validatedData.tagline,
				websiteUrl: validatedData.url,
				githubUrl,
				logoUrl: logoUrl ?? "",
				imageUrl: imageUrl ?? "",
				tags: validatedData.useCases || [],
				isOpenSource,
				intlayerVersion: scanResult.intlayerVersion,
				libsUsed: scanResult.libsUsed,
				scanDetails: scanResult.scanDetails,
			});

			console.log("[submitProjectAction] Project saved successfully!");

			yield {
				step: "SUCCESS",
				project: JSON.parse(JSON.stringify(newProject)),
			};
		} catch (error) {
			console.error("[submitProjectAction] Critical error:", error);
			const message = error instanceof Error ? error.message : "Unknown error";
			yield { step: "ERROR", message };
		}
	});

export const getProjects = createServerFn({ method: "GET" })
	.inputValidator((data: unknown) => getProjectsSchema.parse(data))
	.handler(async ({ data }: { data: GetProjectsInput }) => {
		try {
			await connectDB();

			const { page, pageSize, search, selectedUseCases, isOpenSource } = data;

			const query: Record<string, unknown> = {};

			if (isOpenSource) {
				query.githubUrl = { $exists: true, $ne: null };
			}
			if (selectedUseCases && selectedUseCases.length > 0) {
				query.tags = { $in: selectedUseCases };
			}
			if (search?.trim()) {
				query.$or = [
					{ title: { $regex: search, $options: "i" } },
					{ description: { $regex: search, $options: "i" } },
					{ tags: { $regex: search, $options: "i" } },
				];
			}

			const total_items = await ProjectModel.countDocuments(query);
			const total_pages = Math.ceil(total_items / pageSize) || 1;

			const projects = await ProjectModel.find(query)
				.sort({ upvotes: -1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.lean();

			return {
				data: (projects?.map((project: IProject) => ({
					...project,
					_id: project._id.toString(),
					upvoters: project.upvoters || [],
				})) ?? []) as unknown as Project[],
				total_pages,
				total_items,
			};
		} catch (error) {
			console.error("Error fetching projects from MongoDB:", error);
			return { data: [], total_pages: 1, total_items: 0 };
		}
	});

export const getProjectById = createServerFn({ method: "GET" })
	.inputValidator((data: unknown) =>
		z.object({ projectId: z.string() }).parse(data),
	)
	.handler(async ({ data }: { data: { projectId: string } }) => {
		try {
			await connectDB();
			const project = await ProjectModel.findById(data.projectId).lean();

			if (!project) {
				return { data: null };
			}

			return {
				data: {
					...project,
					_id: project._id.toString(),
					upvoters: project.upvoters || [],
				} as unknown as Project,
			};
		} catch (error) {
			console.error("Error fetching project by ID:", error);
			return { data: null };
		}
	});
export const getOtherProjects = createServerFn({ method: "GET" })
	.inputValidator((data: unknown) =>
		z
			.object({ excludeId: z.string(), limit: z.number().optional() })
			.parse(data),
	)
	.handler(
		async ({ data }: { data: { excludeId: string; limit?: number } }) => {
			try {
				await connectDB();
				const limit = data.limit || 4;
				const projects = await ProjectModel.find({
					_id: { $ne: data.excludeId },
				})
					.limit(limit)
					.lean();

				return {
					data: projects.map((project: any) => ({
						...project,
						_id: project._id.toString(),
						upvoters: project.upvoters || [],
					})) as unknown as Project[],
				};
			} catch (error) {
				console.error("Error fetching other projects:", error);
				return { data: [] };
			}
		},
	);

export const toggleLike = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) =>
		z.object({ projectId: z.string(), userId: z.string() }).parse(data),
	)
	.handler(
		async ({ data }: { data: { projectId: string; userId: string } }) => {
			try {
				await connectDB();
				const { projectId, userId } = data;

				const project = await ProjectModel.findById(projectId);

				if (!project) {
					throw new Error("Project not found");
				}

				const upvoters = project.upvoters || [];
				const isLiked = upvoters.includes(userId);

				if (isLiked) {
					// Unlike
					project.upvoters = upvoters.filter((id) => id !== userId);
					project.upvotes = Math.max(0, (project.upvotes || 0) - 1);
				} else {
					// Like
					project.upvoters.push(userId);
					project.upvotes = (project.upvotes || 0) + 1;
				}

				await project.save();

				return {
					success: true,
					upvotes: project.upvotes,
					isLiked: !isLiked,
				};
			} catch (error) {
				console.error("Error toggling like:", error);
				return { success: false, error: (error as Error).message };
			}
		},
	);
