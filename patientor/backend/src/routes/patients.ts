import express, { type Request, type Response } from 'express';
import patients from '../../data/patients.ts';
import type { Patient } from '../types.ts';
import { NewPatientSchema } from '../types.ts';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';

const router = express.Router();

type ErrorResponse = {
  error: z.ZodIssue[] | string;
};

type PatientResponse = Patient | ErrorResponse;

router.get('/', (_req, res) => {
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patients.find(
    patient => patient.id === req.params.id
  );

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

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
        ...newPatient,
        entries: []
      };

      patients.push(patient);
      res.json(patient);
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