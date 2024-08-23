
import express from 'express';
import { authenticateUser } from '../../middleware/authMiddleware.js';
import { authorizeAdmin } from '../../middleware/authorizationMiddleware.js';
import { getDepartments, createDepartment } from './departmentController.js';

const router = express.Router();

//  all users view  all departments (no authentication required)
router.get('/departments', getDepartments);

//  Create a new department (Admin only)
router.post('/departments', authenticateUser, authorizeAdmin, createDepartment);

export default router;
