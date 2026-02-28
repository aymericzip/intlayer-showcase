import { connect, type mongo } from "mongoose";

// Store the DB client singleton
let dbClientInstance: mongo.MongoClient | null = null;

export const connectDB = async (): Promise<mongo.MongoClient> => {
	try {
		const client = await connect(
			`mongodb+srv://${process.env.DB_ID}:${process.env.DB_MDP}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`,
		);

		console.log("MongoDB connected");

		dbClientInstance = client.connection.getClient();

		return dbClientInstance;
	} catch (error) {
		const errorMessage = `MongoDB connection error - ${(error as Error).message}`;

		console.error(errorMessage);
		throw new Error(errorMessage);
	}
};

/**
 * Get the MongoDB client instance.
 * Must be called after connectDB() has been executed.
 */
export const getDBClient = (): mongo.MongoClient => {
	if (!dbClientInstance) {
		throw new Error("Database not connected. Call connectDB() first.");
	}
	return dbClientInstance;
};
