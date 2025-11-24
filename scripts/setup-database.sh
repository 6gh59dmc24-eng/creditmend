#!/bin/bash

# Database Setup Script for Coolify
# This script will create all tables in your PostgreSQL database

set -e

echo "🔍 Checking environment..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set!"
    echo "Please set it in your .env file or environment variables"
    exit 1
fi

echo "✅ DATABASE_URL is set"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are you in the right directory?"
    exit 1
fi

echo "✅ In correct directory"

# Check if Prisma schema exists
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ prisma/schema.prisma not found!"
    exit 1
fi

echo "✅ Prisma schema found"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "🚀 Creating database tables..."
npx prisma db push --accept-data-loss

echo ""
echo "✅ Database setup complete!"
echo ""
echo "📊 Checking tables..."
npx prisma db execute --stdin <<SQL
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
SQL

echo ""
echo "🎉 Done! Your database is ready."
