const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  try {
    const email = `test_${Date.now()}@example.com`;
    const password = 'TestPassword123!';
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log(`Attempting to create user: ${email}`);

    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email,
        password: hashedPassword,
        role: 'CLIENT',
      },
    });

    console.log('User created:', user.id);

    const profile = await prisma.clientProfile.create({
      data: {
        userId: user.id,
        clientNumber: `CR${Date.now().toString().slice(-6)}`,
        onboardingStatus: 'PENDING',
      },
    });

    console.log('Profile created:', profile.id);
  } catch (e) {
    console.error('Error creating user:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
