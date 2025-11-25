# Build Notes

## Build Error: Missing Clerk Publishable Key

**Error**: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`

**Cause**: The build process requires Clerk environment variables to be set.

**Solution**: Before running `npm run build`, ensure these environment variables are set:

```bash
# Required for build
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmljaC1nb29zZS02Ny5jbGVyay5hY2NvdW50cy5kZXYk
```

### For Development:
Add to `.env.local`:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmljaC1nb29zZS02Ny5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_[get-from-clerk-dashboard]
CLERK_WEBHOOK_SECRET=whsec_[get-after-creating-webhook]
```

### For Production Build:
Set in your CI/CD environment or hosting platform:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_[your-production-key]
CLERK_SECRET_KEY=sk_live_[your-production-secret]
CLERK_WEBHOOK_SECRET=whsec_[your-webhook-secret]
```

## Testing the Build

Once environment variables are set:

```bash
# Development build test
npm run build

# Production build (in CI/CD)
NODE_ENV=production npm run build
```

## Additional Build Warnings

### Metadata Viewport Warnings
```
⚠ Unsupported metadata viewport is configured in metadata export
```

**Impact**: Non-breaking warnings. These can be fixed later by moving viewport configuration to separate exports as per Next.js 16 requirements.

**Action**: Low priority. Can be fixed in a follow-up update.

---

## Migration Status

✅ **Code Migration**: Complete
✅ **Security Audit**: Complete
✅ **Documentation**: Complete
⚠️ **Environment Setup**: Required (see SETUP_INSTRUCTIONS.md)
⏳ **Build Test**: Pending environment variable configuration
⏳ **Integration Test**: Pending after environment setup

---

## Quick Start After Env Setup

```bash
# 1. Set up environment variables (see SETUP_INSTRUCTIONS.md)
cp .env.example .env.local
# Edit .env.local with your actual keys

# 2. Install dependencies
npm install

# 3. Generate Prisma client
npx prisma generate

# 4. Test build
npm run build

# 5. Start development server
npm run dev
```

---

See `SETUP_INSTRUCTIONS.md` for detailed setup steps.
