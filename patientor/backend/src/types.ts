export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientWithoutSSN = Pick<
  Patient,
  "id" | "name" | "dateOfBirth" | "gender" | "occupation"
>;
