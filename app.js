// app.js
import dotenv from 'dotenv'; // Move to the very top
dotenv.config({ path: '.env.development.local' }); // Force load this specific file

import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import { connect } from 'mongoose';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import aj from './config/arcjet.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(aj.protect);
app.use(arcjetMiddleware);

app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/subscriptions`, subscriptionRouter);
app.set('trust proxy', true); // Trust the first proxy

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the subscription tracker app');
});

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV, process.env.ARCJET_ENV, process.env.ARCJET_KEY); // Debug env vars

  await connectToDatabase();
});

export default app;