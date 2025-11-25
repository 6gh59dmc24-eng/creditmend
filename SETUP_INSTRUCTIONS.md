# 🚀 Clerk Setup Instructions - IMMEDIATE ACTION REQUIRED

## ⚠️ Critical: Complete These Steps Before Testing

The migration is complete, but you MUST complete these setup steps for the application to work properly.

---

## Step 1: Add Environment Variables (5 minutes)

### Development Environment

1. Open your `.env.local` file (create it if it doesn't exist)
2. Add these variables with your actual Clerk keys:

```bash
# Copy from: https://dashboard.clerk.com/last-active?path=api-keys

# Publishable Key (already provided)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmljaC1nb29zZS02Ny5jbGVyay5hY2NvdW50cy5kZXYk

# Secret Key - GET THIS FROM CLERK DASHBOARD
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx

# Webhook Secret - GET THIS AFTER CREATING WEBHOOK (Step 2)
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx

# Keep existing environment variables
DATABASE_URL="your-existing-database-url"
RESEND_API_KEY="your-existing-resend-key"
```

### Production Environment

When deploying to production:
- Use `pk_live_xxx` instead of `pk_test_xxx`
- Use `sk_live_xxx` instead of `sk_test_xxx`
- Update Clerk Dashboard with production webhook URL

---

## Step 2: Configure Clerk Webhook (10 minutes)

**WHY**: The webhook syncs Clerk users to your database. Without it, signups will fail.

### Steps:

1. **Go to Clerk Dashboard**
   - Visit: https://dashboard.clerk.com/last-active?path=webhooks

2. **Add New Endpoint**
   - Click "Add Endpoint"
   - For local testing: `https://your-ngrok-url/api/webhooks/clerk`
   - For staging: `https://staging.creditmend.org/api/webhooks/clerk`
   - For production: `https://creditmend.org/api/webhooks/clerk`

3. **Subscribe to Events**
   Select these events:
   - ✓ `user.created`
   - ✓ `user.updated`
   - ✓ `user.deleted`

4. **Copy Webhook Secret**
   - After creating the endpoint, copy the "Signing Secret"
   - Format: `whsec_xxxxxxxxxxxxxxxxxxxxxx`
   - Add to `.env.local` as `CLERK_WEBHOOK_SECRET`

5. **Test the Webhook**
   - Click "Send Example" in Clerk Dashboard
   - Check your application logs for: `✅ User synced to database`
   - If you see errors, check the webhook handler logs

---

## Step 3: Verify Database Schema (15 minutes)

**CRITICAL**: Clerk uses string-based user IDs, not integers.

### Check Your Schema

```bash
# View your current schema
npx prisma studio
# or
cat prisma/schema.prisma
```

### Look for User Model

```prisma
model User {
  id String @id @default(cuid()) // ✅ GOOD - Can accept Clerk IDs
  // or
  id String @id                   // ✅ GOOD - We'll set it manually

  // ❌ BAD - This won't work:
  // id Int @id @default(autoincrement())
}
```

### If You Have `Int` ID (Action Required):

1. **Backup your database first!**
   ```bash
   pg_dump your_database > backup_before_clerk_migration.sql
   ```

2. **Create migration:**
   ```bash
   # This is complex - test in development first
   # You'll need to:
   # - Change User.id from Int to String
   # - Update all foreign keys
   # - Migrate existing data if any
   ```

3. **Alternative**: Create a new User table specifically for Clerk:
   ```prisma
   model ClerkUser {
     id        String @id // Clerk's user ID
     email     String @unique
     name      String?
     role      String @default("CLIENT")
     // ... other fields
   }
   ```

---

## Step 4: Test Locally (30 minutes)

### Start Development Server

```bash
# Install dependencies (if not done)
npm install

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev
```

### Run Through Test Checklist

#### Test 1: Sign Up
1. Go to `http://localhost:3000/auth/signup`
2. Create a new account with your test email
3. **Expected**:
   - Clerk signup form appears
   - Email verification sent
   - After verification, user created in Clerk
   - Webhook fires and creates user in your database
   - Client profile created
4. **Check Database**:
   ```bash
   npx prisma studio
   # Verify User and ClientProfile records exist
   ```

#### Test 2: Sign In
1. Go to `http://localhost:3000/auth/signin`
2. Sign in with your test account
3. **Expected**:
   - Successfully redirected to `/dashboard`
   - User name displays correctly
   - UserButton shows in header

#### Test 3: Protected Routes
1. Open incognito window
2. Try to access `http://localhost:3000/dashboard`
3. **Expected**:
   - Immediately redirected to `/auth/signin`

#### Test 4: API Authentication
1. While signed in, open browser console
2. Run:
   ```javascript
   fetch('/api/ai/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message: 'test' })
   }).then(r => r.json()).then(console.log)
   ```
3. **Expected**: Response with session data (not 401 error)

#### Test 5: Sign Out
1. Click user avatar in header
2. Click "Sign Out"
3. **Expected**:
   - Redirected to home page
   - Cannot access `/dashboard` anymore

---

## Step 5: Check Logs (5 minutes)

### Application Logs
```bash
# In your terminal where npm run dev is running
# Look for:
✅ User synced to database: user_xxxxxxxxx
✅ User updated in database: user_xxxxxxxxx
```

### Webhook Logs (Clerk Dashboard)
1. Go to Webhooks in Clerk Dashboard
2. Click on your endpoint
3. Check "Recent Deliveries" tab
4. Should see successful deliveries (green checkmarks)

---

## Common Issues & Solutions

### Issue: "Unauthorized" on signup
**Solution**: Check `CLERK_SECRET_KEY` is set correctly in `.env.local`

### Issue: User created in Clerk but not in database
**Solution**:
- Check webhook is configured correctly
- Check `CLERK_WEBHOOK_SECRET` matches Clerk Dashboard
- Check webhook endpoint is publicly accessible (use ngrok for local testing)

### Issue: "Invalid signature" on webhook
**Solution**:
- Copy webhook secret again from Clerk Dashboard
- Ensure no extra spaces in `.env.local`
- Restart your development server

### Issue: Database schema error
**Solution**:
- Check User.id is String type
- Run `npx prisma generate`
- Restart development server

### Issue: CSP blocks Clerk resources
**Solution**: Already configured in middleware, but if issues persist:
- Check browser console for CSP errors
- Verify middleware.ts has `*.clerk.accounts.dev` in CSP

---

## Development Workflow

### Using ngrok for Local Webhook Testing

```bash
# Install ngrok (if not installed)
brew install ngrok  # macOS
# or download from https://ngrok.com

# Start your app
npm run dev

# In another terminal, expose port 3000
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Add to Clerk webhook: https://abc123.ngrok.io/api/webhooks/clerk
```

---

## Security Reminders

### For PII/SSN Handling:
- ✓ Always use HTTPS in production
- ✓ Never log sensitive data
- ✓ Encrypt SSN fields in database
- ✓ Enable MFA for admin accounts
- ✓ Monitor authentication logs
- ✓ Set up alerts for failed auth attempts

### Rate Limiting:
- Currently: 100 requests per 15 minutes per IP
- Monitor and adjust based on traffic patterns

---

## Next Steps After Local Testing

Once everything works locally:

1. **Deploy to Staging**
   - Update staging environment variables
   - Create staging webhook in Clerk
   - Run full test suite

2. **Security Review**
   - Review `SECURITY_AUDIT.md`
   - Complete all security checklist items
   - Document any custom security measures

3. **Production Deployment**
   - Switch to production Clerk keys (`pk_live_xxx`)
   - Create production webhook
   - Enable monitoring and alerts
   - Notify users if needed

---

## Support & Resources

### Documentation
- Clerk Docs: https://clerk.com/docs
- Next.js App Router: https://nextjs.org/docs/app
- Migration Guide: See `CLERK_MIGRATION.md`
- Security Audit: See `SECURITY_AUDIT.md`

### Troubleshooting
- Clerk Support: https://clerk.com/support
- Clerk Discord: https://clerk.com/discord
- Check webhook logs in Clerk Dashboard

---

## Compliance Notes

**For Government Audits:**
- All authentication now goes through SOC 2 Type II certified provider (Clerk)
- MFA capability built-in
- Session management meets security standards
- Audit logs available in Clerk Dashboard
- See `SECURITY_AUDIT.md` for full compliance documentation

---

## ✅ Completion Checklist

Before considering setup complete:

- [ ] Environment variables added to `.env.local`
- [ ] Webhook configured in Clerk Dashboard
- [ ] Webhook secret added to `.env.local`
- [ ] Database schema verified (User.id is String)
- [ ] All 5 local tests passed
- [ ] Webhook logs show successful deliveries
- [ ] No errors in application console
- [ ] User can sign up, sign in, and access dashboard
- [ ] Protected routes properly redirect
- [ ] API routes require authentication

**Time Estimate**: 1-2 hours for complete setup and testing

---

**Questions?** Review `CLERK_MIGRATION.md` and `SECURITY_AUDIT.md` for detailed information.
