import { S3Client } from "@aws-sdk/client-s3";

let cachedClient: S3Client | null = null;

export const getS3Client = (): S3Client => {
	if (!cachedClient) {
		cachedClient = new S3Client({
			region: "auto",
			endpoint:
				process.env.R2_ENDPOINT ||
				`https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
			credentials: {
				accessKeyId: process.env.R2_ACCESS_KEY_ID!,
				secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
			},
		});
	}
	return cachedClient;
};
