import { isNotNumber } from './utils.ts';

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const periodLength = dailyHours.length;

  const trainingDays = dailyHours.filter(
    hours => hours > 0
  ).length;

  const totalHours = dailyHours.reduce(
    (sum, hours) => sum + hours,
    0
  );

  const average = totalHours / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent';
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// Command-line functionality
const args = process.argv.slice(2);

if (args.length >= 2) {
  if (args.some(isNotNumber)) {
    throw new Error('All arguments must be numbers.');
  }

  const target = Number(args[0]);

  const dailyHours = args
    .slice(1)
    .map(Number);

  console.log(calculateExercises(dailyHours, target));
}