import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import { router } from './routes';

import '@shared/container';

import { connection } from '@shared/infra/typeorm/typeorm.config';

const app = express();

app.use(express.json());

connection
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.use(router);

export { app };
