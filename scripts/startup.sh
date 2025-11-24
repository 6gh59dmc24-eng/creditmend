#!/bin/bash
set -e

echo "🚀 Starting Credit Repair CRM..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Push database schema (create tables if they don't exist)
echo "🗄️  Pushing database schema..."
npx prisma db push --accept-data-loss

# Start the application
echo "✅ Starting Next.js application..."
npm start
