import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

// Database connection to the application
import '@shared/infra/typeorm';

// Connection of dependency injection with the application
import '@shared/container';

import { ServerError } from '@shared/errors/ServerError';
import { routes } from '../routes';

const app = express();

// Express will understand jSON
app.use(express.json());

app.use(routes);

app.use(ServerError);

export { app };
