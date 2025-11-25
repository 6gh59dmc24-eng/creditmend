# Clerk Configuration Setup

## Required Environment Variables

Make sure these environment variables are set in your deployment environment:

### 1. Clerk Keys (Required)
Get these from https://dashboard.clerk.com/last-active?path=api-keys

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 2. Clerk Webhook (Required for user sync)
Get this from Clerk Dashboard > Webhooks

```bash
CLERK_WEBHOOK_SECRET=whsec_...
```

## Troubleshooting Steps

### 1. Check if Clerk is loading
Visit `/debug` page to see:
- If Clerk is loaded
- If environment variables are set
- Current authentication state

### 2. Common Issues

**SignIn/SignUp components not showing:**
- Missing `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Incorrect key format
- Network issues blocking Clerk CDN

**Authentication not working:**
- Missing `CLERK_SECRET_KEY`
- Webhook not configured
- CORS issues

### 3. Verify Setup

1. Check environment variables in deployment dashboard
2. Visit `/debug` route to test Clerk loading
3. Check browser console for errors
4. Verify Clerk domain configuration

## Next Steps

1. Add Clerk keys to deployment environment
2. Test authentication flow
3. Configure webhook for user synchronization
4. Remove debug page once confirmed working