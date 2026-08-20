import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});