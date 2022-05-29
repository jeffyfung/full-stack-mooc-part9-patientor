import express from 'express';
import cors from 'cors';
import router from './controllers/router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', router);

export = app;
