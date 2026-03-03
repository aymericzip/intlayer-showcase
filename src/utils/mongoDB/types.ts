import type { Types } from "mongoose";

export type RenameId<T extends { id: Types.ObjectId }> = Omit<T, "id"> & {
	_id: T["id"];
};

export type OmitId<T extends { id?: unknown; _id?: unknown }> = Omit<
	T,
	"id" | "_id"
>;
