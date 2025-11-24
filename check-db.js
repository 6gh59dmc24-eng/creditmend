const { PrismaClient } = require('@prisma/client');

async function checkConnection() {
  const prisma = new PrismaClient();

  console.log('----------------------------------------');
  console.log('🔍 Checking Database Connection...');
  console.log('----------------------------------------');

  try {
    // Try to connect
    await prisma.$connect();
    console.log('✅ Successfully connected to the database engine.');

    // Try a simple query to verify the database exists and is responsive
    const count = await prisma.user.count();
    console.log(`✅ Database is responsive. Found ${count} users.`);
    console.log('----------------------------------------');
    console.log('🟢 STATUS: WORKING');
    console.log('----------------------------------------');
  } catch (error) {
    console.error('❌ Connection Failed:');
    console.error('----------------------------------------');
    console.error(`Error Code: ${error.code}`);
    console.error(`Message: ${error.message}`);
    console.log('----------------------------------------');
    console.log('🔴 STATUS: NOT WORKING');
    console.log('----------------------------------------');
    console.log('Troubleshooting tips:');
    console.log('1. Is your PostgreSQL server running?');
    console.log('2. Is the DATABASE_URL in your .env file correct?');
    console.log('3. If using Docker, is the container up?');
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
