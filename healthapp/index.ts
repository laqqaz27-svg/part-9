import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (
    typeof height !== 'string' ||
    typeof weight !== 'string' ||
    isNaN(Number(height)) ||
    isNaN(Number(weight))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi: calculateBmi(heightNumber, weightNumber)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({
      error: 'parameters missing'
    });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((value: unknown) => isNaN(Number(value))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const dailyExercises = daily_exercises.map(Number);
  const targetNumber = Number(target);

  const result = calculateExercises(
    dailyExercises,
    targetNumber
  );

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});