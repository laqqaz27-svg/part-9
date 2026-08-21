import express, { type Response } from 'express';
import diagnoses from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoses);
});

export default router;
