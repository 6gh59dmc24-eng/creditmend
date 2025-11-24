import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@creditrepair.com';
  const adminPassword = 'SecureAdminPassword123!@#'; // Secure production password

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'System Administrator',
        role: 'ADMIN',
        isActive: true,
        staffProfile: {
          create: {
            employeeNumber: 'ADMIN-001',
            department: 'Executive',
            position: 'Chief Administrator',
            permissions: ['ALL'],
          },
        },
      },
    });

    console.log('----------------------------------------');
    console.log('ADMIN USER CREATED');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('----------------------------------------');
  } else {
    console.log('Admin user already exists.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
