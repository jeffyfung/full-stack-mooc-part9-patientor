import express from 'express';
import DiagnosesService from '../services/DiagnosesService';
import PatientService from '../services/PatientService';

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

export = router;
