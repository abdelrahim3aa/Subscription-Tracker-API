import { Router } from "express";
import { body } from "express-validator"; // you forgot this import
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js"; // also missed the .js extension

const userRouter = Router();

// ✅ All routes below use protect middleware
userRouter.use(protect);

// ✅ Routes list
// GET     localhost:8080/api/v1/users      → getAllUsers
// GET     localhost:8080/api/v1/users/:id  → getUser
// POST    localhost:8080/api/v1/users      → createUser
// PUT     localhost:8080/api/v1/users/:id  → updateUser
// DELETE  localhost:8080/api/v1/users/:id  → deleteUser

// 🟢 READ
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);

// 🟢 CREATE
userRouter.post(
  '/',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  createUser
);

// 🟢 UPDATE
userRouter.put(
  '/:id',
  [
    body('name').optional().notEmpty(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 })
  ],
  updateUser
);

// 🟢 DELETE
userRouter.delete('/:id', deleteUser);

export default userRouter;
