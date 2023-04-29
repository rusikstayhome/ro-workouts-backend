import { InferSchemaType, model, Schema } from 'mongoose';

const exerciseSchema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String },
		shortDescription: { type: String },
		videoUrl: { type: String },
		difficultyLevel: { type: String, required: true },
		targetZone: { type: String, required: true },
	},
	{ timestamps: true }
);

type Exercise = InferSchemaType<typeof exerciseSchema>;

export default model<Exercise>('Exercise', exerciseSchema);
