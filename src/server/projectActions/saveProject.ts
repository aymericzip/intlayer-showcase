import ProjectModel, { type IScanDetails } from "@/models/Project";

export const saveProject = async (projectData: {
	title: string;
	description: string;
	websiteUrl: string;
	githubUrl?: string;
	logoUrl: string;
	imageUrl: string;
	tags: string[];
	isOpenSource: boolean;
	intlayerVersion?: string;
	libsUsed: string[];
	scanDetails?: IScanDetails;
}) => {
	const newProject = new ProjectModel({
		...projectData,
		upvoters: [],
	});

	await newProject.save();

	return newProject;
};
