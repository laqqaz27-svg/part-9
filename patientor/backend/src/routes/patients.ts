import express, { type Request, type Response } from 'express';
import patients from '../../data/patients.ts';
import type { Patient, PatientWithoutSSN } from '../types.ts';
import { v1 as uuid } from 'uuid';

const router = express.Router();

type PatientRequestBody = Omit<Patient, 'id'>;


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
  (req: Request<unknown, PatientWithoutSSN, PatientRequestBody>, res: Response<PatientWithoutSSN>) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  patients.push(newPatient);

  const patientWithoutSSN: PatientWithoutSSN = {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation
  };

  res.json(patientWithoutSSN);
  }
);

export default router;