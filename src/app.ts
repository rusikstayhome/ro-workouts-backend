import 'dotenv/config';
import express from 'express';
import ExerciseModel from './models/exercise';

const app = express();

app.get('/', async (req, res) => {
  const exercises = await ExerciseModel.find().exec();
  res.status(200).json(exercises);
});

export default app;
