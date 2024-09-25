import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          firstName: 'Admin',
          lastName: 'User',
          email: process.env.ADMIN_EMAIL,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      console.log('Admin user seeded successfully!');
    } else {
      console.log(`User with email ${process.env.ADMIN_EMAIL} already exists.`);
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
