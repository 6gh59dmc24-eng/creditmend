# Coolify Health Check Configuration

## Health Check Endpoint

The application has a dedicated health check endpoint at:

```
/api/healthz
```

This endpoint:
- Returns HTTP 200 when the app is healthy
- Responds to both GET and HEAD requests
- Returns JSON with status and uptime
- Does not check database (faster response)

For database health check, use: `/api/health`

## Configure in Coolify

### Method 1: In Coolify UI

1. Go to your application in Coolify
2. Click on **Settings** or **Health Check** tab
3. Set the following:

```
Health Check Method: HTTP
Health Check Path: /api/healthz
Health Check Port: 3000
Health Check Interval: 10s
Health Check Timeout: 5s
Health Check Retries: 3
Health Check Start Period: 30s
```

### Method 2: Using Docker Labels (if using docker-compose)

Add these labels to your service:

```yaml
services:
  app:
    labels:
      - "coolify.healthcheck.enabled=true"
      - "coolify.healthcheck.path=/api/healthz"
      - "coolify.healthcheck.port=3000"
      - "coolify.healthcheck.interval=10s"
      - "coolify.healthcheck.timeout=5s"
      - "coolify.healthcheck.retries=3"
```

### Method 3: Add HEALTHCHECK to Dockerfile

If you have a custom Dockerfile, add:

```dockerfile
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/healthz || exit 1
```

## Testing the Health Check

Test the endpoint locally or in production:

```bash
# Simple check
curl https://creditmend.org/api/healthz

# Response:
# {"status":"ok","timestamp":"2025-11-24T07:30:00.000Z","uptime":123.45}

# HEAD request (faster)
curl -I https://creditmend.org/api/healthz

# Response:
# HTTP/2 200
```

## Health Check Status

Once configured, Coolify will:
- ✅ Show **green checkmark** when healthy (returns 200)
- ⚠️ Show **warning** when degraded (intermittent failures)
- 🔴 Show **red** when unhealthy (consistent failures)
- ❗ Show **exclamation** when not configured

## Troubleshooting

If health check fails:

1. **Check endpoint is accessible:**
   ```bash
   curl https://creditmend.org/api/healthz
   ```

2. **Check Coolify logs:**
   - Look for health check errors in deployment logs

3. **Verify port:**
   - Next.js runs on port 3000 by default
   - Make sure health check is checking the correct port

4. **Check timeout:**
   - If app is slow to start, increase `start-period` to 60s

5. **Verify path:**
   - Path should be `/api/healthz` (with leading slash)
   - No trailing slash

## Advanced: Database Health Check

If you want to also verify database connectivity:

Use endpoint: `/api/health`

This checks:
- Application is running
- Database is connected
- Returns user count

Note: This is slower than `/api/healthz` so use for monitoring, not health checks.

## Recommended Settings

For production:

```
Path: /api/healthz
Interval: 10s    (check every 10 seconds)
Timeout: 5s      (fail if no response in 5 seconds)
Retries: 3       (mark unhealthy after 3 failures)
Start Period: 30s (give app 30 seconds to start)
```

For development:

```
Path: /api/healthz
Interval: 30s
Timeout: 10s
Retries: 5
Start Period: 60s
```

## Result

After configuration, your Coolify dashboard will show:
- ✅ Green checkmark instead of ❗ exclamation mark
- Real-time health status
- Automatic restart if unhealthy (if configured)
