import { getDepartments, createDepartment } from './departmentService.js';

export async function getDepartmentsController(req, res) {
  try {
    const departments = await getDepartments();
    res.json({ departments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve departments' });
  }
}

export async function createDepartmentController(req, res) {
  try {
    const { name } = req.body;
    const newDepartment = await createDepartment({ name });
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create department' });
  }
}
