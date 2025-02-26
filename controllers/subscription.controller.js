import Subscription from "../models/subscription.model.js";
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    try {
      const { workflowRunId } = await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: { subscriptionId: subscription._id },
        headers: { 'content-type': 'application/json' },
        retries: 0,
      });

      res.status(201).json({ success: true, data: { subscription, workflowRunId } });
    } catch (error) {
      if (error.status === 401) {
        console.error('Authentication failed with Upstash. Please check your QSTASH_TOKEN.');
        res.status(201).json({ success: true, data: { subscription }, warning: 'Workflow trigger failed due to authentication error' });
      } else if (error.status === 404) {
        console.error('Workflow URL not found:', error);
        res.status(201).json({ success: true, data: { subscription }, warning: 'Workflow trigger failed due to URL not found' });
      } else if (error.message.includes('Failed to infer request path')) {
        console.error('Workflow URL parsing error:', error);
        res.status(201).json({ success: true, data: { subscription }, warning: 'Workflow trigger failed due to URL parsing error' });
      } else {
        console.error('Unexpected workflow error:', error);
        throw error;
      }
    }
  } catch (e) {
    next(e);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};