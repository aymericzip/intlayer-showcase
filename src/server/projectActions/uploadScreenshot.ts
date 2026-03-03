import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "@/utils/s3/s3Client";

export const uploadScreenshot = async (
	screenshotBuffer: Buffer,
): Promise<string> => {
	const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
	const s3Client = getS3Client();

	console.log("[uploadScreenshot] Uploading to S3...");

	await s3Client.send(
		new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: fileName,
			Body: screenshotBuffer,
			ContentType: "image/jpeg",
		}),
	);

	const imageUrl = process.env.R2_PUBLIC_URL
		? `${process.env.R2_PUBLIC_URL}/${fileName}`
		: `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME || "project-screenshot"}/${fileName}`;

	console.log("[uploadScreenshot] Screenshot uploaded:", imageUrl);

	return imageUrl;
};
