// Delete ALL Data Script - NUCLEAR OPTION: Deletes everything
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

async function deleteAllData() {
  try {
    console.log('🚨 NUCLEAR OPTION: This will DELETE ALL DATA from the database!');
    console.log('This includes users, cases, disputes, documents, everything!');
    console.log('This action CANNOT be undone.\n');

    // Count everything
    const counts = {
      users: await prisma.user.count(),
      clientProfiles: await prisma.clientProfile.count(),
      staffProfiles: await prisma.staffProfile.count(),
      cases: await prisma.case.count(),
      disputes: await prisma.dispute.count(),
      documents: await prisma.document.count(),
      notifications: await prisma.notification.count(),
      payments: await prisma.payment.count(),
      chatSessions: await prisma.chatSession.count(),
      chatMessages: await prisma.chatMessage.count(),
      creditReports: await prisma.creditReport.count(),
      tasks: await prisma.task.count(),
      notes: await prisma.note.count(),
      communications: await prisma.communication.count(),
    };

    console.log('Data to be deleted:');
    console.log('═══════════════════════════════════════════════════════════');
    Object.entries(counts).forEach(([key, count]) => {
      console.log(`  ${key}: ${count}`);
    });
    console.log('═══════════════════════════════════════════════════════════\n');

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    if (total === 0) {
      console.log('✅ Database is already empty.');
      rl.close();
      return;
    }

    // Confirm deletion
    const answer = await question('Type "DELETE EVERYTHING" to confirm: ');

    if (answer !== 'DELETE EVERYTHING') {
      console.log('\n❌ Deletion cancelled. No data was deleted.');
      rl.close();
      return;
    }

    console.log('\n🗑️  Deleting all data...\n');

    // Delete in proper order to avoid foreign key constraints
    console.log('Deleting chat messages...');
    await prisma.chatMessage.deleteMany({});

    console.log('Deleting chat sessions...');
    await prisma.chatSession.deleteMany({});

    console.log('Deleting AI recommendations...');
    await prisma.aiRecommendation.deleteMany({});

    console.log('Deleting user points...');
    await prisma.userPoints.deleteMany({});

    console.log('Deleting communications...');
    await prisma.communication.deleteMany({});

    console.log('Deleting tasks...');
    await prisma.task.deleteMany({});

    console.log('Deleting notes...');
    await prisma.note.deleteMany({});

    console.log('Deleting timeline events...');
    await prisma.timelineEvent.deleteMany({});

    console.log('Deleting documents...');
    await prisma.document.deleteMany({});

    console.log('Deleting disputes...');
    await prisma.dispute.deleteMany({});

    console.log('Deleting credit accounts...');
    await prisma.creditAccount.deleteMany({});

    console.log('Deleting credit inquiries...');
    await prisma.creditInquiry.deleteMany({});

    console.log('Deleting public records...');
    await prisma.publicRecord.deleteMany({});

    console.log('Deleting credit reports...');
    await prisma.creditReport.deleteMany({});

    console.log('Deleting cases...');
    await prisma.case.deleteMany({});

    console.log('Deleting payments...');
    await prisma.payment.deleteMany({});

    console.log('Deleting subscriptions...');
    await prisma.subscription.deleteMany({});

    console.log('Deleting notifications...');
    await prisma.notification.deleteMany({});

    console.log('Deleting client profiles...');
    await prisma.clientProfile.deleteMany({});

    console.log('Deleting staff profiles...');
    await prisma.staffProfile.deleteMany({});

    console.log('Deleting accounts (OAuth)...');
    await prisma.account.deleteMany({});

    console.log('Deleting sessions...');
    await prisma.session.deleteMany({});

    console.log('Deleting audit logs...');
    await prisma.auditLog.deleteMany({});

    console.log('Deleting users...');
    await prisma.user.deleteMany({});

    console.log('\n✅ All data deleted successfully!');

    // Verify
    const remainingUsers = await prisma.user.count();
    console.log(`✅ Verification: ${remainingUsers} users in database`);

    console.log('\n🎉 Database is now completely empty!\n');
    console.log('To create a test user, run:');
    console.log('  npm run user:create');

  } catch (error) {
    console.error('\n❌ Error:', error);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

deleteAllData();
