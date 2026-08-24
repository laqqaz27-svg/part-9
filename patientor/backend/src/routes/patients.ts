import express, { type Response } from 'express';
import patients from '../../data/patients.ts';
import type { PatientWithoutSSN } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  const patientsWithoutSSN: PatientWithoutSSN[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );

  res.send(patientsWithoutSSN);
});

export default router;