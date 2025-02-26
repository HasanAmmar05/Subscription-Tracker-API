import dotenv from "dotenv";
dotenv.config({ path: ".env.development.local" });

console.log("Loading environment from .env.development.local:", {
  NODE_ENV: process.env.NODE_ENV,
  ARCJET_ENV: process.env.ARCJET_ENV,
  ARCJET_KEY: process.env.ARCJET_KEY,
});

import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";
import { sendReminders } from './controllers/workflow.controller.js'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(arcjetMiddleware);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter); // Ensure correct mounting

// Explicitly mount the sendReminders workflow for /subscription/reminder
app.use('/api/v1/workflows/subscription/reminder', sendReminders);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );
  console.log(
    "Environment:",
    process.env.NODE_ENV,
    process.env.ARCJET_ENV,
    process.env.ARCJET_KEY
  ); // Debug

  await connectToDatabase();
});

export default app;