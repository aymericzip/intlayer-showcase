import mongoose from "mongoose";

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/intlayer-showcase";

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local",
	);
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

declare global {
	// eslint-disable-next-line no-var
	var __mongooseCached:
		| {
				conn: typeof mongoose | null;
				promise: Promise<typeof mongoose> | null;
		  }
		| undefined;
}

let cached = global.__mongooseCached;

if (!cached) {
	cached = global.__mongooseCached = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached?.conn) {
		return cached.conn;
	}

	if (cached && !cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then((mongooseInstance) => {
				return mongooseInstance;
			});
	}

	try {
		if (cached) {
			cached.conn = await (cached.promise as Promise<typeof mongoose>);
		}
	} catch (e) {
		if (cached) {
			cached.promise = null;
		}
		throw e;
	}

	return cached?.conn;
}

export default dbConnect;
