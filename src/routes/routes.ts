import express from 'express';
import * as ExercisesController from '../controllers/exercises';

const router = express.Router();

router.get('/', ExercisesController.getExercises);

router.get('/:exerciseId', ExercisesController.getExercise);

router.post('/', ExercisesController.createExercise);

export default router;
