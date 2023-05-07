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
	shortDescription?: string;
	videoUrl?: string;
	difficultyLevel: string;
	targetZone: string;
}

export const createExercise: RequestHandler<
	unknown,
	unknown,
	CreateExerciseBody,
	unknown
> = async (req, res, next) => {
	const {
		title,
		description,
		shortDescription,
		videoUrl,
		difficultyLevel,
		targetZone,
	} = req.body;

	try {
		const missingFields = [];

		if (!title) {
			missingFields.push('title');
		}

		if (!difficultyLevel) {
			missingFields.push('difficultyLevel');
		}

		if (!targetZone) {
			missingFields.push('targetZone');
		}

		if (!title || !difficultyLevel || !targetZone) {
			throw createHttpError(
				400,
				'Exercise must have: ' + missingFields.join(', ')
			);
		}

		const newExercise = await ExerciseModel.create({
			title,
			description,
			shortDescription,
			videoUrl,
			difficultyLevel,
			targetZone,
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
	shortDescription?: string;
	videoUrl?: string;
	difficultyLevel?: string;
	targetZone?: string;
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
	const newShortDescription = req.body.shortDescription;
	const newVideoUrl = req.body.videoUrl;
	const newDifficultyLevel = req.body.difficultyLevel;
	const newtargetZone = req.body.targetZone;

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

		if (!newtargetZone) {
			missingFields.push('targetZone');
		}

		if (!newTitle || !newDifficultyLevel || !newtargetZone) {
			throw createHttpError(
				400,
				'Exercise must have: ' + missingFields.join(', ')
			);
		}

		const exercise = await ExerciseModel.findById(exerciseId).exec();

		if (!exercise) {
			throw createHttpError(404, 'Exercise not found');
		}

		exercise.title = newTitle;
		exercise.description = newDescription;
		exercise.shortDescription = newShortDescription;
		exercise.videoUrl = newVideoUrl;
		exercise.difficultyLevel = newDifficultyLevel;
		exercise.targetZone = newtargetZone;

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
