// Reset User Password Script
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword() {
  try {
    // Get email from command line argument
    const email = process.argv[2];
    const newPassword = process.argv[3] || 'Test123456';

    if (!email) {
      console.log('Usage: node scripts/reset-user-password.js <email> [password]');
      console.log('Example: node scripts/reset-user-password.js user@example.com MyNewPass123');
      console.log('\nIf password is not provided, default is: Test123456');
      return;
    }

    console.log(`🔍 Looking for user: ${email}`);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('❌ User not found!');
      console.log('\nAvailable users:');
      const allUsers = await prisma.user.findMany({
        select: { email: true, name: true },
      });
      allUsers.forEach(u => console.log(`   - ${u.email} (${u.name})`));
      return;
    }

    console.log(`✅ User found: ${user.name}`);
    console.log(`🔒 Hashing new password...`);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    console.log('\n✅ Password reset successfully!');
    console.log('═══════════════════════════════════');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 New Password: ${newPassword}`);
    console.log('═══════════════════════════════════');
    console.log('\nYou can now login at: https://creditmend.org/auth/signin');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
