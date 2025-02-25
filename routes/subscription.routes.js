import express from 'express';
import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';
import arcjetMiddleware from '../middlewares/arcjet.middleware.js';

const router = Router();

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }));

// subscriptionRouter.post('/:', authorize, arcjetMiddleware, createSubscription);
router.post('/', async (req, res) => {
    const details = { 
      ip: req.ip || '127.0.0.1', 
      userAgent: req.headers['user-agent'] 
    };
    console.log('Request details:', details); // Debug log
    const decision = await aj.protect(req, details);
    if (decision.isDenied()) {
      return res.status(429).send('Too Many Requests');
    }
    // Proceed with subscription creation logic using the controller
    try {
      const newSubscription = await createSubscription(req, res, next); // Use your controller function
      res.status(201).json({ success: true, data: newSubscription }); // Customize the response
    } catch (error) {
      next(error); // Pass errors to your error middleware
    }
  });

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription' }));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription' }));

subscriptionRouter.delete('/user/:id', (req, res) => res.send({ title: 'GET all user subscriptions' }));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }));

export default subscriptionRouter;