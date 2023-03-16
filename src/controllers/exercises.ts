import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
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
    if (!mongoose.isValidObjectId(exerciseId)) {
      throw createHttpError(400, 'Invalid exercise id');
    }

    const exercise = await ExerciseModel.findById(exerciseId).exec();

    if (!exercise) {
      throw createHttpError(404, 'Exercise not found');
    }

    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
};

interface CreateExerciseBody {
  title: string;
  description?: string;
  videoUrl?: string;
  difficultyLevel: string;
  targetMuscle: string;
}

export const createExercise: RequestHandler<unknown, unknown, CreateExerciseBody, unknown> = async (
  req,
  res,
  next,
) => {
  const { title, description, videoUrl, difficultyLevel, targetMuscle } = req.body;

  try {
    const missingFields = [];

    if (!title) {
      missingFields.push('title');
    }

    if (!difficultyLevel) {
      missingFields.push('difficultyLevel');
    }

    if (!targetMuscle) {
      missingFields.push('targetMuscle');
    }

    if (!title || !difficultyLevel || !targetMuscle) {
      throw createHttpError(400, 'Exercise must have: ' + missingFields.join(', '));
    }

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

interface UpdateExerciseParams {
  exerciseId: string;
}

interface UpdateExerciseBody {
  title?: string;
  description?: string;
  videoUrl?: string;
  difficultyLevel?: string;
  targetMuscle?: string;
}

export const updateExercise: RequestHandler<
  UpdateExerciseParams,
  unknown,
  UpdateExerciseBody,
  unknown
> = async (req, res, next) => {
  const { exerciseId } = req.params;
  const newTitle = req.body.title;
  const newDescription = req.body.description;
  const newVideoUrl = req.body.videoUrl;
  const newDifficultyLevel = req.body.difficultyLevel;
  const newTargetMuscle = req.body.targetMuscle;

  try {
    if (!mongoose.isValidObjectId(exerciseId)) {
      throw createHttpError(400, 'Invalid exercise id');
    }

    const missingFields = [];

    if (!newTitle) {
      missingFields.push('title');
    }

    if (!newDifficultyLevel) {
      missingFields.push('difficultyLevel');
    }

    if (!newTargetMuscle) {
      missingFields.push('targetMuscle');
    }

    if (!newTitle || !newDifficultyLevel || !newTargetMuscle) {
      throw createHttpError(400, 'Exercise must have: ' + missingFields.join(', '));
    }

    const exercise = await ExerciseModel.findById(exerciseId).exec();

    if (!exercise) {
      throw createHttpError(404, 'Exercise not found');
    }

    exercise.title = newTitle;
    exercise.description = newDescription;
    exercise.videoUrl = newVideoUrl;
    exercise.difficultyLevel = newDifficultyLevel;
    exercise.targetMuscle = newTargetMuscle;

    const updatedExercise = await exercise.save();

    res.status(200).json(updatedExercise);
  } catch (error) {
    next(error);
  }
};

export const deleteExercise: RequestHandler = async (req, res, next) => {
  const { exerciseId } = req.params;

  try {
    if (!mongoose.isValidObjectId(exerciseId)) {
      throw createHttpError(400, 'Invalid exercise id');
    }

    const exercise = await ExerciseModel.findById(exerciseId).exec();

    if (!exercise) {
      throw createHttpError(404, 'Exercise not found');
    }

    await exercise.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
