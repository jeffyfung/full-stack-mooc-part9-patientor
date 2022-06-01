import express from 'express';
import DiagnosesService from '../services/DiagnosesService';
import PatientService from '../services/PatientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

router.get('/diagnoses', (_req, res) => {
  const rtn = DiagnosesService.getAll();
  res.status(200).json(rtn);
});

router.get('/patients', (_req, res) => {
  const rtn = PatientService.getAllWithoutSsn();
  res.status(200).json(rtn);
});

router.post('/patients', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const rtn = PatientService.addPatient(newPatientEntry);
    res.status(200).json(rtn);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

export = router;
