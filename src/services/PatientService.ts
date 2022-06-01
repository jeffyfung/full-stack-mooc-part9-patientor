import { PatientNoSsn } from '../types';
import patients from '../../data/patients';

const getAllWithoutSsn = (): Array<PatientNoSsn> => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export = {
  getAllWithoutSsn,
};
