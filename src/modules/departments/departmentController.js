import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await prisma.department.create({
      data: {
        name,
      },
    });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
