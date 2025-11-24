// List All Users Script
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function listUsers() {
  try {
    console.log('👥 Fetching all users...\n');

    const users = await prisma.user.findMany({
      include: {
        clientProfile: true,
        staffProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (users.length === 0) {
      console.log('No users found in database.');
      return;
    }

    console.log(`Found ${users.length} user(s):\n`);
    console.log('═══════════════════════════════════════════════════════════');

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name || 'Unnamed User'}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Has Password: ${user.password ? '✅ Yes' : '❌ No'}`);
      console.log(`   Password Length: ${user.password ? user.password.length : 0} chars`);
      console.log(`   Email Verified: ${user.emailVerified ? '✅ Yes' : '❌ No'}`);
      console.log(`   Active: ${user.isActive ? '✅ Yes' : '❌ No'}`);
      console.log(`   Created: ${user.createdAt.toISOString()}`);
      console.log(`   Last Login: ${user.lastLoginAt ? user.lastLoginAt.toISOString() : 'Never'}`);

      if (user.clientProfile) {
        console.log(`   Client #: ${user.clientProfile.clientNumber}`);
      }
      if (user.staffProfile) {
        console.log(`   Staff #: ${user.staffProfile.employeeNumber}`);
      }
    });

    console.log('\n═══════════════════════════════════════════════════════════');

    // Check for users without passwords
    const usersWithoutPassword = users.filter(u => !u.password);
    if (usersWithoutPassword.length > 0) {
      console.log('\n⚠️  WARNING: Found users without passwords:');
      usersWithoutPassword.forEach(u => {
        console.log(`   - ${u.email} (${u.name})`);
      });
      console.log('\nThese users cannot login. Run create-test-user.js to fix or delete them.');
    }

    // Check for inactive users
    const inactiveUsers = users.filter(u => !u.isActive);
    if (inactiveUsers.length > 0) {
      console.log('\n⚠️  WARNING: Found inactive users:');
      inactiveUsers.forEach(u => {
        console.log(`   - ${u.email} (${u.name})`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
