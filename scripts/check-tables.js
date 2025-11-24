// Check Database Tables Script
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTables() {
  try {
    console.log('🔍 Checking database connection...\n');

    // Query to get all tables
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    console.log('✅ Database connected successfully!\n');
    console.log(`📊 Found ${tables.length} tables:\n`);

    tables.forEach((table, index) => {
      console.log(`${index + 1}. ${table.table_name}`);
    });

    console.log('\n🔢 Checking record counts...\n');

    // Check user count
    const userCount = await prisma.user.count();
    console.log(`👥 Users: ${userCount}`);

    const caseCount = await prisma.case.count();
    console.log(`📋 Cases: ${caseCount}`);

    const disputeCount = await prisma.dispute.count();
    console.log(`⚖️  Disputes: ${disputeCount}`);

    console.log('\n✅ Database is ready to use!');

    if (userCount === 0) {
      console.log('\n💡 Tip: Create your first user at /auth/signup');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables();
