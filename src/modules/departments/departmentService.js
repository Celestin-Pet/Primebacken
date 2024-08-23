import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getDepartments() {
  return await prisma.department.findMany();
}

export async function createDepartment(departmentData) {
  return await prisma.department.create({
    data: departmentData,
  });
}
