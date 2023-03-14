import { InferSchemaType, model, Schema } from 'mongoose';

const exerciseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String },
    difficultyLevel: { type: String, required: true },
  },
  { timestamps: true },
);

type Exercise = InferSchemaType<typeof exerciseSchema>;

export default model<Exercise>('Exercise', exerciseSchema);