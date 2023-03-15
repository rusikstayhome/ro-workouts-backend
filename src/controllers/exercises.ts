import { RequestHandler } from 'express';
import ExerciseModel from '../models/exercise';

export const getExercises: RequestHandler = async (req, res, next) => {
  try {
    const exercises = await ExerciseModel.find().exec();
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
};

export const createExercise: RequestHandler = async (req, res, next) => {
  const { title, description, videoUrl, difficultyLevel } = req.body;

  try {
    const newExercise = await ExerciseModel.create({
      title,
      description,
      videoUrl,
      difficultyLevel,
    });

    res.status(201).json(newExercise);
  } catch (error) {
    next(error);
  }
};
