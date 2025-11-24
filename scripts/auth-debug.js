#!/usr/bin/env node

/**
 * Authentication Debug Script for Credit Repair CRM
 * 
 * This script helps diagnose login issues by:
 * 1. Testing database connectivity
 * 2. Checking user data integrity
 * 3. Testing password hashing
 * 4. Validating NextAuth configuration
 * 5. Checking authentication flow
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Initialize Prisma
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test basic query
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);
    
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
}

async function checkUserData() {
  console.log('\n🔍 Checking user data...');
  try {
    // Get first few users
    const users = await prisma.user.findMany({
      take: 5,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        password: true,
        createdAt: true,
      }
    });
    
    console.log(`📊 Sample users found: ${users.length}`);
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Name: ${user.name || 'N/A'}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Active: ${user.isActive}`);
      console.log(`  Has Password: ${!!user.password}`);
      console.log(`  Password Length: ${user.password ? user.password.length : 0}`);
      console.log(`  Created: ${user.createdAt}`);
      console.log('---');
    });
    
    return users;
  } catch (error) {
    console.log('❌ Error fetching user data:', error.message);
    return [];
  }
}

async function testPasswordHashing() {
  console.log('\n🔍 Testing password hashing...');
  try {
    const testPassword = 'TestPassword123!';
    
    // Test bcrypt hashing
    const hash = await bcrypt.hash(testPassword, 12);
    console.log(`🔐 Test password hashed successfully: ${hash.substring(0, 20)}...`);
    
    // Test verification
    const isValid = await bcrypt.compare(testPassword, hash);
    console.log(`✅ Password verification: ${isValid ? 'SUCCESS' : 'FAILED'}`);
    
    // Test with wrong password
    const isInvalid = await bcrypt.compare('WrongPassword', hash);
    console.log(`❌ Wrong password test: ${!isInvalid ? 'CORRECTLY_REJECTED' : 'INCORRECTLY_ACCEPTED'}`);
    
    return { hash, isValid, isInvalid };
  } catch (error) {
    console.log('❌ Password hashing test failed:', error.message);
    return null;
  }
}

async function testUserAuthentication(email, password) {
  console.log(`\n🔍 Testing authentication for: ${email}`);
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        clientProfile: true,
        staffProfile: true,
      },
    });
    
    if (!user) {
      console.log('❌ User not found');
      return { success: false, reason: 'USER_NOT_FOUND' };
    }
    
    console.log(`✅ User found: ${user.id}`);
    console.log(`  Active: ${user.isActive}`);
    console.log(`  Role: ${user.role}`);
    console.log(`  Has Password: ${!!user.password}`);
    
    if (!user.isActive) {
      return { success: false, reason: 'USER_INACTIVE' };
    }
    
    if (!user.password) {
      return { success: false, reason: 'NO_PASSWORD' };
    }
    
    // Test password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('❌ Password verification failed');
      return { success: false, reason: 'INVALID_PASSWORD' };
    }
    
    console.log('✅ Password verification successful');
    
    // Test profile data
    console.log(`  Client Profile: ${!!user.clientProfile ? 'EXISTS' : 'NONE'}`);
    console.log(`  Staff Profile: ${!!user.staffProfile ? 'EXISTS' : 'NONE'}`);
    
    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        clientProfile: user.clientProfile,
        staffProfile: user.staffProfile,
      }
    };
  } catch (error) {
    console.log('❌ Authentication test error:', error.message);
    return { success: false, reason: 'ERROR', error: error.message };
  }
}

async function checkEnvironmentVariables() {
  console.log('\n🔍 Checking environment variables...');
  
  const requiredVars = [
    'DATABASE_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET'
  ];
  
  const missing = [];
  const present = [];
  
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      const value = varName.includes('SECRET') || varName.includes('PASSWORD') 
        ? '[REDACTED]' 
        : process.env[varName];
      present.push(`${varName}: ${value}`);
    } else {
      missing.push(varName);
    }
  });
  
  if (present.length > 0) {
    console.log('✅ Environment variables found:');
    present.forEach(v => console.log(`  ${v}`));
  }
  
  if (missing.length > 0) {
    console.log('❌ Missing environment variables:');
    missing.forEach(v => console.log(`  ${v}`));
  }
  
  return { present, missing };
}

async function runComprehensiveTest() {
  console.log('🚀 Starting Authentication Debug Analysis\n');
  console.log('=' .repeat(50));
  
  // Check environment
  await checkEnvironmentVariables();
  
  // Test database
  const dbConnected = await testDatabaseConnection();
  
  if (!dbConnected) {
    console.log('\n❌ Cannot proceed without database connection');
    return;
  }
  
  // Check user data
  const users = await checkUserData();
  
  if (users.length === 0) {
    console.log('\n⚠️  No users found in database - this could be the issue');
    return;
  }
  
  // Test password hashing
  const hashTest = await testPasswordHashing();
  
  // Test authentication with sample users
  console.log('\n🧪 Testing authentication with sample users...');
  for (let i = 0; i < Math.min(users.length, 3); i++) {
    const user = users[i];
    if (user.password) {
      // Try common test passwords
      const testPasswords = ['password', '123456', 'Test123456', 'password123'];
      
      for (const testPass of testPasswords) {
        const result = await testUserAuthentication(user.email, testPass);
        if (result.success) {
          console.log(`🎉 SUCCESS: Found working credentials!`);
          console.log(`   Email: ${user.email}`);
          console.log(`   Password: ${testPass}`);
          console.log(`   User ID: ${result.user.id}`);
          break;
        }
      }
    }
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('🏁 Debug analysis complete');
  
  // Summary
  console.log('\n📋 SUMMARY:');
  console.log(`  Database: ${dbConnected ? '✅ Connected' : '❌ Failed'}`);
  console.log(`  Users: ${users.length} found`);
  console.log(`  Password Hashing: ${hashTest ? '✅ Working' : '❌ Failed'}`);
  
  console.log('\n🔧 NEXT STEPS:');
  console.log('1. If no working credentials found, create a test user via signup');
  console.log('2. Check application logs for specific error messages');
  console.log('3. Test authentication flow in browser with dev tools open');
  console.log('4. Verify CORS and security middleware configuration');
}

// Run the test
if (require.main === module) {
  runComprehensiveTest()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = {
  testDatabaseConnection,
  checkUserData,
  testPasswordHashing,
  testUserAuthentication,
  checkEnvironmentVariables,
  runComprehensiveTest,
};