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

export const getExercise: RequestHandler = async (req, res, next) => {
  const { exerciseId } = req.params;
  try {
    const exercise = await ExerciseModel.findById(exerciseId).exec();
    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
};

export const createExercise: RequestHandler = async (req, res, next) => {
  const { title, description, videoUrl, difficultyLevel, targetMuscle } = req.body;

  try {
    const newExercise = await ExerciseModel.create({
      title,
      description,
      videoUrl,
      difficultyLevel,
      targetMuscle,
    });

    res.status(201).json(newExercise);
  } catch (error) {
    next(error);
  }
};
