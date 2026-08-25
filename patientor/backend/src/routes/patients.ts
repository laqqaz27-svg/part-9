import express, { type Request, type Response } from 'express';
import patients from '../../data/patients.ts';
import type { Patient, PatientWithoutSSN } from '../types.ts';
import parseNewPatient from '../utils.ts';
import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  res.json(
    patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }))
  );
});

router.post(
  '/',
  (
    req: Request<unknown, PatientWithoutSSN | string, unknown>,
    res: Response<PatientWithoutSSN | string>
  ) => {
    try {
      const newPatient = parseNewPatient(req.body);
      const patient: Patient = {
        id: uuid(),
        ...newPatient
      };

      patients.push(patient);

      const { id, name, dateOfBirth, gender, occupation } = patient;
      res.json({ id, name, dateOfBirth, gender, occupation });
    } catch (error: unknown) {
      res.status(400).send(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  }
);

export default router;