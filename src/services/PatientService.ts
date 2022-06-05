import { Patient, PublicPatient, NewPatientEntry } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getAllWithoutSsn = (): PublicPatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (newPatient: NewPatientEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...newPatient,
  };
  patients.push(newEntry);
  return newEntry;
};

export = {
  getAllWithoutSsn,
  addPatient,
  getPatientById,
};
