#!/usr/bin/env node
// Comprehensive Authentication Flow Test Script
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function header(message) {
  log(`\n${'='.repeat(60)}`, 'bright');
  log(`  ${message}`, 'bright');
  log(`${'='.repeat(60)}`, 'bright');
}

let testsPassed = 0;
let testsFailed = 0;

async function testDatabaseConnection() {
  header('TEST 1: Database Connection');

  try {
    await prisma.$queryRaw`SELECT 1`;
    success('Database connection successful');
    testsPassed++;
    return true;
  } catch (err) {
    error(`Database connection failed: ${err.message}`);
    testsFailed++;
    return false;
  }
}

async function testTablesExist() {
  header('TEST 2: Database Tables');

  try {
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    const tableNames = tables.map(t => t.table_name);
    const requiredTables = ['users', 'client_profiles', 'cases', 'disputes'];

    info(`Found ${tables.length} tables in database`);

    let allTablesExist = true;
    for (const table of requiredTables) {
      if (tableNames.includes(table)) {
        success(`Table '${table}' exists`);
      } else {
        error(`Table '${table}' is missing!`);
        allTablesExist = false;
      }
    }

    if (allTablesExist) {
      testsPassed++;
      return true;
    } else {
      error('Some required tables are missing. Run: npx prisma db push');
      testsFailed++;
      return false;
    }
  } catch (err) {
    error(`Failed to check tables: ${err.message}`);
    testsFailed++;
    return false;
  }
}

async function testUserCreation() {
  header('TEST 3: User Creation');

  const testEmail = `test-${Date.now()}@creditmend.org`;
  const testPassword = 'TestPassword123!';
  const testName = 'Test User';

  try {
    info(`Creating test user: ${testEmail}`);

    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    success(`Password hashed (length: ${hashedPassword.length})`);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        password: hashedPassword,
        role: 'CLIENT',
      },
    });

    success(`User created with ID: ${user.id}`);

    // Create client profile
    await prisma.clientProfile.create({
      data: {
        userId: user.id,
        clientNumber: `CR${Date.now().toString().slice(-6)}`,
        onboardingStatus: 'PENDING',
      },
    });

    success('Client profile created');

    testsPassed++;
    return { user, password: testPassword };
  } catch (err) {
    error(`User creation failed: ${err.message}`);
    testsFailed++;
    return null;
  }
}

async function testPasswordVerification(user, plainPassword) {
  header('TEST 4: Password Verification');

  try {
    info(`Testing password verification for: ${user.email}`);

    // Test correct password
    const isValidCorrect = await bcrypt.compare(plainPassword, user.password);
    if (isValidCorrect) {
      success('Correct password verified successfully');
    } else {
      error('Correct password failed to verify!');
      testsFailed++;
      return false;
    }

    // Test wrong password
    const isValidWrong = await bcrypt.compare('WrongPassword123', user.password);
    if (!isValidWrong) {
      success('Wrong password correctly rejected');
    } else {
      error('Wrong password was accepted!');
      testsFailed++;
      return false;
    }

    testsPassed++;
    return true;
  } catch (err) {
    error(`Password verification test failed: ${err.message}`);
    testsFailed++;
    return false;
  }
}

async function testUserLookup(email) {
  header('TEST 5: User Lookup');

  try {
    info(`Looking up user: ${email}`);

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        clientProfile: true,
        staffProfile: true,
      },
    });

    if (user) {
      success('User found in database');
      info(`  ID: ${user.id}`);
      info(`  Name: ${user.name}`);
      info(`  Email: ${user.email}`);
      info(`  Role: ${user.role}`);
      info(`  Has Password: ${user.password ? 'Yes' : 'No'}`);
      info(`  Password Hash Length: ${user.password?.length || 0}`);
      info(`  Has Client Profile: ${user.clientProfile ? 'Yes' : 'No'}`);

      testsPassed++;
      return user;
    } else {
      error('User not found in database');
      testsFailed++;
      return null;
    }
  } catch (err) {
    error(`User lookup failed: ${err.message}`);
    testsFailed++;
    return null;
  }
}

async function testFullAuthFlow(email, password) {
  header('TEST 6: Full Authentication Flow');

  try {
    info('Simulating login process...');

    // Step 1: Find user
    info('Step 1: Finding user by email');
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        clientProfile: true,
        staffProfile: true,
      },
    });

    if (!user) {
      error('User not found');
      testsFailed++;
      return false;
    }
    success('User found');

    // Step 2: Check password exists
    info('Step 2: Checking password exists');
    if (!user.password) {
      error('User has no password');
      testsFailed++;
      return false;
    }
    success('Password exists');

    // Step 3: Verify password
    info('Step 3: Verifying password');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      error('Password verification failed');
      testsFailed++;
      return false;
    }
    success('Password verified');

    // Step 4: Update last login
    info('Step 4: Updating last login time');
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    success('Last login updated');

    // Step 5: Create session data (simulate)
    info('Step 5: Creating session data');
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      clientProfile: user.clientProfile,
      staffProfile: user.staffProfile,
    };
    success('Session data created');

    testsPassed++;
    return true;
  } catch (err) {
    error(`Full auth flow failed: ${err.message}`);
    testsFailed++;
    return false;
  }
}

async function testEnvironmentVariables() {
  header('TEST 7: Environment Variables');

  const requiredVars = [
    'DATABASE_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ];

  let allPresent = true;

  for (const varName of requiredVars) {
    if (process.env[varName]) {
      success(`${varName} is set`);

      if (varName === 'NEXTAUTH_URL') {
        if (process.env[varName].includes('localhost')) {
          warning(`${varName} contains 'localhost' - should be production domain`);
        }
        if (process.env[varName].endsWith('/')) {
          warning(`${varName} has trailing slash - remove it`);
        }
      }
    } else {
      error(`${varName} is NOT set`);
      allPresent = false;
    }
  }

  if (allPresent) {
    testsPassed++;
    return true;
  } else {
    testsFailed++;
    return false;
  }
}

async function testExistingUsers() {
  header('TEST 8: Existing Users Check');

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
        isActive: true,
        lastLoginAt: true,
      },
    });

    info(`Found ${users.length} user(s) in database`);

    if (users.length === 0) {
      warning('No users in database');
      info('Run: npm run user:create');
    } else {
      users.forEach((user, index) => {
        console.log(`\n  User ${index + 1}:`);
        info(`    Email: ${user.email}`);
        info(`    Name: ${user.name}`);
        info(`    Role: ${user.role}`);
        info(`    Has Password: ${user.password ? 'Yes ✅' : 'No ❌'}`);
        info(`    Password Length: ${user.password?.length || 0}`);
        info(`    Active: ${user.isActive ? 'Yes ✅' : 'No ❌'}`);
        info(`    Last Login: ${user.lastLoginAt || 'Never'}`);

        if (!user.password) {
          error(`    ⚠️  User cannot login - no password!`);
        }
      });
    }

    testsPassed++;
    return true;
  } catch (err) {
    error(`Failed to check existing users: ${err.message}`);
    testsFailed++;
    return false;
  }
}

async function cleanup(testUser) {
  header('CLEANUP: Removing Test Data');

  if (testUser) {
    try {
      info(`Deleting test user: ${testUser.email}`);
      await prisma.user.delete({
        where: { id: testUser.id },
      });
      success('Test user deleted');
    } catch (err) {
      warning(`Could not delete test user: ${err.message}`);
    }
  }
}

async function runTests() {
  console.clear();

  log('\n╔════════════════════════════════════════════════════════════╗', 'bright');
  log('║     Credit Repair CRM - Authentication Test Suite         ║', 'bright');
  log('╚════════════════════════════════════════════════════════════╝', 'bright');

  info(`Started at: ${new Date().toISOString()}\n`);

  let testUser = null;
  let testPassword = null;

  try {
    // Run all tests
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      error('\n❌ Cannot proceed without database connection');
      process.exit(1);
    }

    await testEnvironmentVariables();
    await testTablesExist();
    await testExistingUsers();

    const result = await testUserCreation();
    if (result) {
      testUser = result.user;
      testPassword = result.password;

      await testPasswordVerification(testUser, testPassword);
      await testUserLookup(testUser.email);
      await testFullAuthFlow(testUser.email, testPassword);
    }

  } catch (err) {
    error(`\n❌ Test suite error: ${err.message}`);
    console.error(err);
  } finally {
    // Cleanup
    if (testUser) {
      await cleanup(testUser);
    }

    await prisma.$disconnect();
  }

  // Final report
  header('TEST RESULTS');

  const total = testsPassed + testsFailed;
  const successRate = total > 0 ? ((testsPassed / total) * 100).toFixed(1) : 0;

  console.log('');
  log(`  Total Tests: ${total}`, 'bright');
  log(`  ✅ Passed: ${testsPassed}`, 'green');
  log(`  ❌ Failed: ${testsFailed}`, 'red');
  log(`  Success Rate: ${successRate}%`, testsFailed === 0 ? 'green' : 'yellow');
  console.log('');

  if (testsFailed === 0) {
    success('🎉 All tests passed! Authentication system is working correctly.');
    log('\nYou can now:', 'bright');
    log('  1. Create users with: npm run user:create');
    log('  2. Login at: https://creditmend.org/auth/signin');
  } else {
    error('⚠️  Some tests failed. Please review the errors above.');
    log('\nCommon fixes:', 'bright');
    log('  1. Run database migrations: npx prisma db push');
    log('  2. Check environment variables in Coolify');
    log('  3. Verify NEXTAUTH_URL is set to https://creditmend.org');
  }

  log(`\nFinished at: ${new Date().toISOString()}`, 'cyan');

  process.exit(testsFailed > 0 ? 1 : 0);
}

// Run the test suite
runTests().catch(err => {
  error(`Fatal error: ${err.message}`);
  console.error(err);
  process.exit(1);
});
