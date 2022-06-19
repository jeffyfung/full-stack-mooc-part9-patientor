import { Entry, Gender, NewPatientEntry } from './interfaces/types';

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

const parseEntry = (entry: unknown): Entry => {
  if (!entry || !isEntry(entry)) {
    throw new Error('Incorrect or missing property type; should be Gender');
  }
  return entry;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isEntry = (entry: any): entry is Entry => {
  return ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(entry.type);
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: object.entries.map((entry: any) => parseEntry(entry)),
  };
  return newEntry;
};
