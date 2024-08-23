import { Router } from 'express';
import { getDepartmentsController, createDepartmentController } from './departmentController.js';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Welcome' }));
router.get('/departments', getDepartmentsController);
router.post('/departments', createDepartmentController);

export default router;
