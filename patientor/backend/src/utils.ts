import { Gender, type Gender as GenderType, type NewPatient } from './types.ts';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

export const isGender = (param: string): param is GenderType => {
  return Object.values(Gender).includes(param as GenderType);
};

const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    if (
      !isString(object.name) ||
      !isString(object.dateOfBirth) ||
      !isString(object.ssn) ||
      !isString(object.gender) ||
      !isGender(object.gender) ||
      !isString(object.occupation)
    ) {
      throw new Error('Incorrect or missing field');
    }

    return {
      name: object.name,
      dateOfBirth: object.dateOfBirth,
      ssn: object.ssn,
      gender: object.gender,
      occupation: object.occupation
    };
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;
