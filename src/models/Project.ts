import mongoose from 'mongoose';

export interface IProject extends mongoose.Document {
  title: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  websiteUrl: string;
  githubUrl?: string;
  tags: string[];
  upvotes: number;
  createdAt: Date;
}

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  logoUrl: { type: String },
  websiteUrl: { type: String, required: true },
  githubUrl: { type: String },
  tags: { type: [String], default: [] },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
