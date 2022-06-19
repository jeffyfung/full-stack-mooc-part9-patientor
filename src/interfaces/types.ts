type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnose['code'][];
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

export const validateAsEntry = (body: any): body is NewEntry => {
  if (body) {
    if (
      !body.id &&
      typeof body.description === 'string' &&
      typeof body.date === 'string' &&
      typeof body.specialist === 'string'
    ) {
      switch (body.type) {
        case 'HealthCheck':
          return [0, 1, 2, 3].includes(body.healthCheckRating);
        case 'OccupationalHealthcare':
          return typeof body.employerName === 'string';
        case 'Hospital':
          return (
            typeof body.discharge?.date === 'string' && typeof body.discharge?.criteria === 'string'
          );
      }
    }
  }
  throw new Error('type should be Entry');
};
