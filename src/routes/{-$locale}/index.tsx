import {
	Badge,
	H1,
	H2,
	Button,
	Checkbox,
	Link,
	NumberItemsSelector,
	Pagination,
	SearchInput,
	ShowingResultsNumberItems,
	BadgeColor,
} from "@intlayer/design-system";
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import {
	ChevronDown,
	ExternalLink,
	Plus,
	SlidersHorizontal,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { PagesRoutes } from "@/route";

export const Route = createFileRoute("/{-$locale}/")({
	component: App,
	head: ({ params }) => {
		const { locale } = params as { locale?: string };
		const content = getIntlayer("app", locale);

		return {
			meta: [
				{ title: String(content.metadata.title) },
				{
					name: "description",
					content: String(content.metadata.description),
				},
			],
		};
	},
});

const projects = [
	{
		_id: "2484d088-b5ed-45f3-9696-68382d6cc34b",
		title: "T3 Chat",
		description: "Advanced AI Assistant & ChatGPT Alternative",
		imageUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVwwjm3zZp18qdVDgImpln6XM2kbw7r0BvAyh4C",
		logoUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVw83srHqGR5xKawHdIvJbcz2rpNMu7X6yi0kh1",
		websiteUrl: "https://t3.chat",
		tags: ["Start", "Query", "Table"],
		upvotes: 56,
	},
	{
		_id: "695d14f9-2501-4cb7-97f6-d0e8b13f53c4",
		title: "TanStack.com",
		description: "The official TanStack website",
		imageUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVwbeM7CX1yjbUTMHf0Pda92pWxStKBQAgv6L1G",
		logoUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVwbULHUB1yjbUTMHf0Pda92pWxStKBQAgv6L1G",
		websiteUrl: "https://tanstack.com",
		tags: ["Start", "Query", "Table"],
		upvotes: 36,
	},
	{
		_id: "f225f40c-1e4f-40f7-918d-d86c9c526eea",
		title: "OpenPanel",
		description: "An open-source alternative to Mixpanel",
		imageUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVwNLXQ9ARjes54M3TE7zmiIVnWvrQUqS6HCbak",
		logoUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVw4id9Mdnq34pvTc0JmPEL8jebokYlXDz1FVwO",
		websiteUrl: "https://openpanel.dev",
		tags: ["Start", "Query", "Table"],
		upvotes: 17,
	},
	{
		_id: "7d2f2889-dc2e-45d3-a61d-bb94036a2235",
		title: "Sentry",
		description: "Application Performance Monitoring & Error Tracking Software",
		imageUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVwySwt2pfiwNH4EQC1BmrqRcKv5A0dbUOD3fyS",
		logoUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVw7S7FySoBzcXTj8uf52Z6dYHNpEL04IGkRoFS",
		websiteUrl: "https://sentry.io/welcome/",
		githubUrl: "https://github.com/getsentry/sentry",
		tags: ["Query", "Virtual", "Pacer"],
		upvotes: 14,
	},
	{
		_id: "d95aead3-b450-4b7c-a8a4-201f3d262af7",
		title: "Unkey",
		description: "The Developer Platform for Modern APIs",
		imageUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVwzi2gYP3Q7R3UPunjrLdl2ioVBxNEf48scFAb",
		logoUrl:
			"https://9hzqfznh4u.ufs.sh/f/DGYZkOCb0MVw0ierGcTUC8oNEfByRqa7X6hZlMY0PcTi9ADs",
		websiteUrl: "https://unkey.com",
		tags: ["Query", "DB", "Table"],
		upvotes: 13,
	},
];

function App() {
	const content = useIntlayer("app");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(20);

	const totalItems = projects.length;
	const totalPages = Math.ceil(totalItems / pageSize) || 1;
	const renderedProjects = projects.slice(
		(page - 1) * pageSize,
		page * pageSize,
	);

	return (
		<div className="flex min-h-screen w-full flex-col">
			<div className="bg-background">
				<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
					<div>
						<H1 className="text-4xl font-bold text-text">
							{content.showcase.title}
						</H1>
						<p className="mt-2 text-lg text-neutral-500">
							{content.showcase.description}
						</p>
					</div>
					<Link
						href={PagesRoutes.ShowcaseSubmit}
						variant="button"
						color="text"
						label={String(content.showcase.submitButton)}
					>
						<Plus className="h-5 w-5" />
						<span>{content.showcase.submitButton}</span>
					</Link>
				</div>
			</div>

			<div className="bg-background/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 py-3">
					<div className="rounded-lg border border-text/10 bg-card p-2">
						<div className="flex flex-wrap items-center gap-1.5">
							<SearchInput
								color="text"
								placeholder={String(content.showcase.searchPlaceholder.value)}
								type="text"
							/>
							<Button
								label={String(content.showcase.filters.label.value)}
								variant="outline"
								className="flex items-center gap-1 rounded-md bg-card px-2 py-1 text-xs font-medium text-text transition-colors hover:bg-card-hover lg:hidden"
							>
								<SlidersHorizontal className="h-3.5 w-3.5" />
								<span>{content.showcase.filters.label}</span>
								<ChevronDown className="h-3.5 w-3.5" />
							</Button>
							<div className="hidden items-center gap-1.5 lg:flex">
								<div className="relative">
									<button type="button" className="flex items-center gap-1 rounded-md bg-card px-2 py-1 text-xs font-medium text-text transition-colors hover:bg-card-hover">
										<span>{content.showcase.filters.useCase}</span>
										<ChevronDown className="h-3 w-3 transition-transform" />
									</button>
								</div>
								<label className="flex cursor-pointer items-center gap-1.5 rounded px-1.5 py-0 text-sm hover:bg-card">
									<Checkbox name="opensource" color="text" size="xs" />
									<span>{content.showcase.filters.openSource}</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-8">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{renderedProjects.length > 0 ? (
						renderedProjects.map((project) => (
							<div
								key={project._id}
								className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-text/10 bg-card shadow-lg transition-all hover:shadow-xl"
							>
								<a
									href={project.websiteUrl}
									className="flex flex-1 flex-col"
									target="_blank"
									rel="noopener noreferrer"
								>
									<div className="relative aspect-video overflow-hidden bg-background">
										<img
											alt={project.title}
											className="h-full w-full object-cover transition-transform group-hover:scale-105"
											src={project.imageUrl}
										/>
										{project.logoUrl && (
											<div className="absolute bottom-3 left-3 h-10 w-10 overflow-hidden rounded-lg bg-background shadow-md">
												<img
													alt=""
													className="h-full w-full object-cover"
													src={project.logoUrl}
												/>
											</div>
										)}
									</div>
									<div className="flex-1 p-4">
										<h3 className="text-lg font-bold text-text transition-colors group-hover:text-primary">
											{project.title}
										</h3>
										<p className="mt-1 line-clamp-2 text-sm text-neutral-500">
											{project.description}
										</p>
									</div>
								</a>

								<div className="absolute right-3 top-3 flex gap-2">
									<a
										href={project.websiteUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded-full bg-background/90 p-2 shadow-sm transition-colors hover:bg-card"
										title="Visit site"
									>
										<ExternalLink className="size-4 text-text" />
									</a>
								</div>

								<div className="mt-auto px-4 pb-4">
									<div className="flex items-end justify-between gap-2">
										<div className="flex min-w-0 flex-wrap gap-1.5">
											{project.tags.map((tag) => (
												<Badge key={tag} 
												className="bg-neutral/50 border-none hover:bg-neutral/50">
													{tag}
												</Badge>
											))}
										</div>
										<div className="flex shrink-0 items-center gap-1">
											<Button
												type="button"
												variant='hoverable'
												label={String(content.showcase.upvote.label.value)}
												color='neutral'
												size='icon-sm'
												Icon={ThumbsUp}
										/>
											<span className="min-w-6 text-center text-sm font-medium text-text">
												{project.upvotes}
											</span>
												<Button
												type="button"
												variant='hoverable'
												label={String(content.showcase.downvote.label.value)}
												color='neutral'
												size='icon-sm'
												Icon={ThumbsDown}
										/>
										
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-full py-12 text-center text-neutral-500">
							{content.showcase.noProjects}
						</div>
					)}
				</div>
			</div>

			<div className="mx-auto mb-12 mt-8 w-full max-w-7xl px-4">
				<div className="flex w-full flex-row items-end justify-between gap-4 pt-8">
					<div className="flex flex-col gap-4">
						<ShowingResultsNumberItems
							currentPage={page}
							pageSize={pageSize}
							totalItems={totalItems}
						/>
						<NumberItemsSelector
							value={pageSize.toString()}
							onValueChange={(val) => {
								setPageSize(Number(val));
								setPage(1);
							}}
						/>
					</div>
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={(page) => setPage(page)}
					/>
				</div>
			</div>
		</div>
	);
}
