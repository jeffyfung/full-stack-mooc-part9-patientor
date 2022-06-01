import { Patient, PatientNoSsn, NewPatientEntry } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getAllWithoutSsn = (): Array<PatientNoSsn> => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
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
};
