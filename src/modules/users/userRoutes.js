import express from 'express';
import multer from 'multer';
import { authenticateUser, authorizeAdmin } from '../auth/authMiddleware.js';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from './userController.js';

const router = express.Router();

// Set up multer for handling file uploads (e.g., user signatures)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Specify the destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Save the file with a timestamp
  },
});

const upload = multer({ storage });

// Route to create a user, with file upload and admin-only access
router.post('/users', authenticateUser, authorizeAdmin, upload.single('signature'), createUser);

// Route to get all users, admin-only access
router.get('/users', authenticateUser, authorizeAdmin, getAllUsers);

// Route to get a specific user by ID, admin-only access
router.get('/users/:id', authenticateUser, authorizeAdmin, getUserById);

// Route to update a user, with optional file upload for signatures, admin-only access
router.put('/users/:id', authenticateUser, authorizeAdmin, upload.single('signature'), updateUser);

// Route to delete a user, admin-only access
router.delete('/users/:id', authenticateUser, authorizeAdmin, deleteUser);

export default router;
