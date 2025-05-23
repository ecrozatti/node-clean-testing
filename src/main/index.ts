import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { usersRouter } from '../interfaces/http/routes/users.routes';
import { errorHandler } from '../interfaces/http/middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
