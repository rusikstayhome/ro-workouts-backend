import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import ExerciseModel from './models/exercise';

const app = express();

app.get('/', async (req, res, next) => {
  try {
    const exercises = await ExerciseModel.find().exec();
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occured';
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
