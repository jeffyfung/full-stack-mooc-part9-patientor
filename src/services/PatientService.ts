import { Patient, PublicPatient, NewPatientEntry } from '../interfaces/types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Entry, NewEntry } from '../interfaces/types';

const getAllPatients = (): Patient[] => patients;

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

const addEntryToPatient = (id: string, entry: NewEntry): Patient => {
  let _entry = entry as Entry;
  _entry['id'] = uuid();
  for (let p of patients) {
    if (p.id === id) {
      p.entries = p.entries.concat(_entry);
      return p;
    }
  }
  throw new Error('Patient id is not found.');
};

export = {
  getAllPatients,
  getAllWithoutSsn,
  addPatient,
  getPatientById,
  addEntryToPatient,
};
