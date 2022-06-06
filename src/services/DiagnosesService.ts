import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../interfaces/types';

const getAll = (): Array<Diagnose> => {
  return diagnoses;
};

export = { getAll };
