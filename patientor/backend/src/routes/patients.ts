import express, { type Request, type Response } from 'express';
import patients from '../../data/patients.ts';
import type { Patient, PatientWithoutSSN } from '../types.ts';
import { NewPatientSchema } from '../types.ts';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';

const router = express.Router();

type ErrorResponse = {
  error: z.ZodIssue[] | string;
};

type PatientResponse = PatientWithoutSSN | ErrorResponse;

router.post(
  '/',
  (
    req: Request<unknown, PatientResponse, unknown>,
    res: Response<PatientResponse>
  ) => {
    try {
      const newPatient = NewPatientSchema.parse(req.body);

      const patient: Patient = {
        id: uuid(),
        ...newPatient
      };

      patients.push(patient);

      const patientWithoutSSN: PatientWithoutSSN = {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
      };

      res.json(patientWithoutSSN);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        res.status(400).send({
          error: error.issues
        });
      } else {
        res.status(400).send({
          error: 'Unknown error'
        });
      }
    }
  }
);

export default router;