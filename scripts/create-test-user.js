// Create Test User Script
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const testEmail = 'test@creditmend.org';
    const testPassword = 'Test123456';
    const testName = 'Test User';

    console.log('🔍 Checking if test user already exists...');

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log(`📧 Email: ${testEmail}`);
      console.log(`🔑 Try logging in with password: ${testPassword}`);

      // Update password just in case
      console.log('\n🔄 Updating password...');
      const hashedPassword = await bcrypt.hash(testPassword, 12);

      await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
      });

      console.log('✅ Password updated successfully!');
      return;
    }

    console.log('👤 Creating new test user...');

    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    console.log('🔒 Password hashed');

    // Create user
    const user = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        password: hashedPassword,
        role: 'CLIENT',
      },
    });

    console.log('✅ User created:', user.id);

    // Create client profile
    await prisma.clientProfile.create({
      data: {
        userId: user.id,
        clientNumber: `CR${Date.now().toString().slice(-6)}`,
        onboardingStatus: 'PENDING',
      },
    });

    console.log('✅ Client profile created');

    console.log('\n🎉 Test user created successfully!');
    console.log('═══════════════════════════════════');
    console.log(`📧 Email: ${testEmail}`);
    console.log(`🔑 Password: ${testPassword}`);
    console.log('═══════════════════════════════════');
    console.log('\nYou can now login at: https://creditmend.org/auth/signin');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
