import express from "express";
import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import arcjetMiddleware from "../middlewares/arcjet.middleware.js";
// import { sendReminderEmail } from '../utils/send-email.js';

const router = Router();

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all subscriptions" })
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET subscription details" })
);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE subscription" })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE subscription" })
);

subscriptionRouter.delete("/user/:id", (req, res) =>
  res.send({ title: "GET all user subscriptions" })
);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL subscription" })
);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// Add a test endpoint to send an email
subscriptionRouter.post('/test-email', authorize, async (req, res, next) => {
  try {
    await sendReminderEmail({
      to: 'test@example.com', // Replace with a test email
      type: 'Test Reminder',
      subscription: {
        name: 'Test Subscription',
        renewalDate: new Date().toISOString(),
      },
    });
    res.status(200).json({ success: true, message: 'Test email sent' });
  } catch (e) {
    next(e);
  }
});

export default subscriptionRouter;