# CRITICAL: Environment Variable Fix Required

## The Problem

Your `.env` file has `NEXTAUTH_URL="http://localhost:3000"` which breaks authentication in production.

Users can signup but cannot login because NextAuth callbacks are pointing to localhost instead of creditmend.org.

## The Fix

### On Your Coolify Server

Set these environment variables in your Coolify project settings:

```bash
DATABASE_URL="postgres://postgres:Hq3Wd1DnQB7ggPTfb1QLsD6cAkuvT6Qg4RwXZ8r1ldBNlbVvKfiklZb97k4XMQPY@l8wwg4o4cg40kkosgc48g88g:5432/postgres"

NEXTAUTH_URL="https://creditmend.org"

NEXTAUTH_SECRET="your-super-secure-random-string-here-generate-a-new-one"

RESEND_API_KEY="re_V6BwJHom_E3F91JBvvMZ3s9pGD2iDaSm4"
```

### Generate a Secure NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

**Example output:** `7xK9mP3nQ2vR8wL5tY6uZ4aB1cD0eF3gH7jI9kL2mN5o`

Use that as your NEXTAUTH_SECRET.

## Steps to Fix

1. **Go to Coolify Dashboard**
2. **Select your credit-repair-crm project**
3. **Go to Environment Variables section**
4. **Update/Add these variables:**
   - `NEXTAUTH_URL` = `https://creditmend.org`
   - `NEXTAUTH_SECRET` = `<generated-secret>`
   - Keep DATABASE_URL and RESEND_API_KEY as they are

5. **Restart/Redeploy your application**

6. **Test login again**

## Why This Fixes It

- NextAuth uses `NEXTAUTH_URL` for:
  - Generating callback URLs
  - Setting cookies
  - Validating requests
  - Redirects after login

- When it's set to `localhost`, the authentication flow breaks in production
- Cookies get set for wrong domain
- Callbacks fail
- Login appears to work but session isn't created

## Verification

After fixing, test:
1. Go to https://creditmend.org/auth/signin
2. Try logging in with: `test@creditmend.org` / `Test123456`
3. Should redirect to dashboard successfully

## Additional Notes

- Never commit NEXTAUTH_SECRET to git (it's in .gitignore)
- Use different secrets for development and production
- NEXTAUTH_URL should NEVER have a trailing slash
- Use HTTPS in production, HTTP only in local development
