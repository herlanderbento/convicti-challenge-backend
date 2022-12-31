import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';

import { router } from './routes';

import '@shared/container';

import { connection } from '@shared/infra/typeorm/typeorm.config';
import { customError } from '@shared/errors/customError';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@docs/swagger.json';

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

app.use(
  '/api-documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get('/swagger', (request: Request, response: Response) => {
  return response.sendFile(process.cwd() + '/src/docs/swagger.json');
});

app.get('/docs', (request: Request, response: Response) => {
  return response.sendFile(process.cwd() + '/src/docs/index.html');
});

app.use(router);
app.use(customError);

export { app };
