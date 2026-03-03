import mongoose from "mongoose";

export interface IScanDetails {
	score: number;
	langTag: string;
	htmlDir: string;
	hreflangs: string[];
	hasXDefault: boolean;
	hasCanonical: boolean;
	hasLocalizedLinks: boolean;
	allAnchorsLocalized: boolean;
	robotsTxt: {
		accessible: boolean;
		disallowWithoutLocaleAlternates: boolean;
	};
	sitemapXml: {
		urlsDiscoveredCount: number;
		alternatesPresent: boolean;
		xDefaultPresent: boolean;
	};
}

export interface IProject extends mongoose.Document {
	title: string;
	description: string;
	imageUrl: string;
	logoUrl?: string;
	websiteUrl: string;
	githubUrl?: string;
	tags: string[];
	upvoters: string[];
	isOpenSource: boolean;
	createdAt: Date;
	intlayerVersion?: string;
	libsUsed: string[];
	lastScanDate?: Date;
	scanDetails?: IScanDetails;
}

const ProjectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	logoUrl: { type: String },
	websiteUrl: { type: String, required: true, unique: true },
	githubUrl: { type: String },
	tags: { type: [String], default: [] },
	upvoters: { type: [String], default: [] },
	isOpenSource: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	intlayerVersion: { type: String },
	libsUsed: { type: [String], default: [] },
	lastScanDate: { type: Date, default: Date.now },
	scanDetails: {
		score: { type: Number },
		langTag: { type: String },
		htmlDir: { type: String },
		hreflangs: { type: [String] },
		hasXDefault: { type: Boolean },
		hasCanonical: { type: Boolean },
		hasLocalizedLinks: { type: Boolean },
		allAnchorsLocalized: { type: Boolean },
		robotsTxt: {
			accessible: { type: Boolean },
			disallowWithoutLocaleAlternates: { type: Boolean },
		},
		sitemapXml: {
			urlsDiscoveredCount: { type: Number },
			alternatesPresent: { type: Boolean },
			xDefaultPresent: { type: Boolean },
		},
	},
});

export default mongoose.models.Project ||
	mongoose.model<IProject>("Project", ProjectSchema);
