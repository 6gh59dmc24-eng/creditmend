// Delete All Users Script - DANGER: This will remove ALL users from the database
const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function deleteAllUsers() {
  try {
    console.log('⚠️  WARNING: This will DELETE ALL USERS from the database!');
    console.log('This action CANNOT be undone.\n');

    // Count users first
    const userCount = await prisma.user.count();
    console.log(`Found ${userCount} user(s) in the database.\n`);

    if (userCount === 0) {
      console.log('✅ No users to delete. Database is already empty.');
      rl.close();
      return;
    }

    // Show users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log('Users to be deleted:');
    console.log('═══════════════════════════════════════════════════════════');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - ${user.role}`);
    });
    console.log('═══════════════════════════════════════════════════════════\n');

    // Confirm deletion
    const answer = await question('Type "DELETE ALL USERS" to confirm: ');

    if (answer !== 'DELETE ALL USERS') {
      console.log('\n❌ Deletion cancelled. No users were deleted.');
      rl.close();
      return;
    }

    console.log('\n🗑️  Deleting all users and related data...\n');

    // Delete in order to avoid foreign key constraints
    // Prisma will handle cascading deletes based on the schema

    // Count related data
    const clientProfileCount = await prisma.clientProfile.count();
    const staffProfileCount = await prisma.staffProfile.count();
    const caseCount = await prisma.case.count();
    const disputeCount = await prisma.dispute.count();
    const documentCount = await prisma.document.count();
    const notificationCount = await prisma.notification.count();
    const paymentCount = await prisma.payment.count();
    const chatSessionCount = await prisma.chatSession.count();

    console.log('Related data to be deleted:');
    console.log(`  - ${clientProfileCount} client profiles`);
    console.log(`  - ${staffProfileCount} staff profiles`);
    console.log(`  - ${caseCount} cases`);
    console.log(`  - ${disputeCount} disputes`);
    console.log(`  - ${documentCount} documents`);
    console.log(`  - ${notificationCount} notifications`);
    console.log(`  - ${paymentCount} payments`);
    console.log(`  - ${chatSessionCount} chat sessions`);
    console.log('');

    // Delete all users (cascading deletes will handle related data)
    const deleteResult = await prisma.user.deleteMany({});

    console.log('✅ All users deleted successfully!');
    console.log(`   Deleted ${deleteResult.count} user(s)\n`);

    // Verify deletion
    const remainingUsers = await prisma.user.count();
    console.log(`✅ Verification: ${remainingUsers} users remaining in database`);

    if (remainingUsers === 0) {
      console.log('\n🎉 Database is now clean! You can create new users.\n');
      console.log('To create a test user, run:');
      console.log('  npm run user:create');
    } else {
      console.log('\n⚠️  Warning: Some users still remain in the database');
    }

  } catch (error) {
    console.error('\n❌ Error deleting users:', error);
    console.error('\nThis might be due to foreign key constraints.');
    console.error('You may need to delete related data first.\n');
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

deleteAllUsers();
