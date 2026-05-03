import { PrismaClient } from '@prisma/client';

async function testConnection() {
  const prisma = new PrismaClient();
  try {
    console.log('Attempting to connect to the database...');
    await prisma.$connect();
    console.log('Successfully connected to the database.');
    const jobCount = await prisma.job.count();
    console.log(`Job count: ${jobCount}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
