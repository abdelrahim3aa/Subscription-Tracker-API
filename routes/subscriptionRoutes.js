import express from 'express';
import { body } from 'express-validator';
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription
} from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// all routes below require auth
router.use(protect); 

// @route GET localhost:8080/api/v1/subscriptions
router.get('/', getSubscriptions);

// @route POST localhost:8080/api/v1/subscriptions
router.post('/',
  body('name').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('renewalDate').isISO8601(),
  createSubscription
);

// @route PUT localhost:8080/api/v1/subscriptions/:id
router.put('/:id',
  body('name').optional().notEmpty(),
  body('price').optional().isFloat({ min: 0 }),
  body('renewalDate').optional().isISO8601(),
  updateSubscription
);

// @route DELETE localhost:8080/api/v1/subscriptions/:id
router.delete('/:id', deleteSubscription);

export default router;
