import { Gender, NewPatientEntry } from './types';

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing property type; should be string');
  }
  return name;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing property type; should be Gender');
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.gender),
  };
  return newEntry;
};
