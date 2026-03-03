import puppeteer from "puppeteer";

export const takeScreenshot = async (url: string): Promise<Buffer> => {
	console.log("[takeScreenshot] Launching puppeteer...");

	const browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		headless: true,
	});

	try {
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 720 });
		await page.goto(url, {
			waitUntil: "networkidle2",
			timeout: 15000,
		});

		console.log("[takeScreenshot] Taking screenshot...");

		const screenshotBuffer = await page.screenshot({
			type: "jpeg",
			quality: 30,
		});

		return screenshotBuffer as Buffer;
	} finally {
		await browser.close();
	}
};
