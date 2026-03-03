import { Octokit } from "octokit";

// Store the Github client singleton
let githubClientInstance: Octokit | null = null;

export const connectGithub = async (): Promise<Octokit> => {
	try {
		githubClientInstance = new Octokit({ auth: process.env.GITHUB_TOKEN });

		console.log("Github connected");

		return githubClientInstance;
	} catch (error) {
		const errorMessage = `Github connection error - ${(error as Error).message}`;

		console.error(errorMessage);
		throw new Error(errorMessage);
	}
};

/**
 * Get the Github client instance.
 * Must be called after connectGithub() has been executed.
 */
export const getGithubClient = (): Octokit => {
	if (!githubClientInstance) {
		throw new Error("Github not connected. Call connectGithub() first.");
	}
	return githubClientInstance;
};
