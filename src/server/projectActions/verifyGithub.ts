import { getGithubClient } from "@/utils/github/connectGithub";

export async function verifyGithub({
	githubUrl,
}: {
	githubUrl: string;
}): Promise<boolean> {
	console.log("Testing Github...");

	console.log(`Testing URL ${githubUrl}`);

	const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
	if (!match) {
		console.log("Invalid Github URL");
		return false;
	}
	const [, owner, repo] = match;

	try {
		const octokit = getGithubClient();
		console.log(`Testing owner ${owner} and repo ${repo}`);
		const response = await octokit.rest.repos.getContent({
			owner,
			repo: repo.replace(/\.git$/, ""),
			path: "package.json",
		});

		// Type guard to ensure response is a single file, not a directory array
		if (!Array.isArray(response.data) && "content" in response.data) {
			const content = Buffer.from(response.data.content, "base64").toString(
				"utf-8",
			);
			const pkg = JSON.parse(content);
			const hasIntlayer = !!(
				pkg.dependencies?.["intlayer"] || pkg.devDependencies?.["intlayer"]
			);
			console.log(`Has Intlayer? ${hasIntlayer}`);
			return hasIntlayer;
		}

		console.log("No content found or path is a directory");
		return false;
	} catch (e) {
		console.error("Error:", e instanceof Error ? e.message : String(e));
		return false;
	}
}
