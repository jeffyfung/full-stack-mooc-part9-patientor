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
  const rtn = PatientService.getAllPatients();
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

router.get('/patients/:id', (req, res) => {
  try {
    const id: string = req.params.id;
    const rtn = PatientService.getPatientById(id);
    if (!rtn) {
      throw new Error('cannot find patient in DB');
    }
    res.status(200).json(rtn);
  } catch (err: unknown) {
    let errMsg: string = 'Error: ';
    if (err instanceof Error) {
      errMsg += err.message;
    }
    res.status(400).json(errMsg);
  }
});

export = router;
