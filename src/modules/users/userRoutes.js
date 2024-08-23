import express from 'express';
import { authenticateUser, authorizeAdmin } from '../auth/authMiddleware.js';
import { createUser, getAllUsers } from './userController.js';

const router = express.Router();

// Route to create a user, only accessible by admin
router.post('/users', authenticateUser, authorizeAdmin, createUser);

// Route to get all users, only accessible by admin
router.get('/users', authenticateUser, authorizeAdmin, getAllUsers);

export default router;
