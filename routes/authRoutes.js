import express from 'express';
import { body } from 'express-validator';
import { register, login, me, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  register
);

authRouter.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  login
);

authRouter.get('/me', protect, me);
authRouter.post('/logout', protect, logout);

export default authRouter;
