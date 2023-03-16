import express from 'express';
import * as ExercisesController from '../controllers/exercises';

const router = express.Router();

router.get('/', ExercisesController.getExercises);

router.get('/:exerciseId', ExercisesController.getExercise);

router.post('/', ExercisesController.createExercise);

router.patch('/:exerciseId', ExercisesController.updateExercise);

router.delete('/:exerciseId', ExercisesController.deleteExercise);

export default router;
