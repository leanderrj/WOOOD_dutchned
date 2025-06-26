# WOOOD Delivery API - Custom Domain Setup Guide

This guide covers setting up custom domains for the WOOOD Delivery API Workers deployment.

## Overview

The WOOOD Delivery API uses custom domains for production and staging environments:

- **Production**: `api.woood-delivery.com`
- **Staging**: `staging-api.woood-delivery.com`

## Prerequisites

- Cloudflare account with Workers enabled
- Domain `woood-delivery.com` added to Cloudflare (or alternative domain)
- Cloudflare CLI (`wrangler`) installed and authenticated
- Appropriate permissions to manage DNS and Workers

## Domain Architecture

```
┌─────────────────────────┐    ┌──────────────────────────┐
│   api.woood-delivery.com │    │  woood-delivery-api      │
│   (Production)          │───►│  (Workers.dev)           │
└─────────────────────────────┘    └──────────────────────────┘

┌─────────────────────────┐    ┌──────────────────────────┐
│staging-api.woood-       │    │  woood-delivery-api-     │
│delivery.com (Staging)   │───►│  staging (Workers.dev)   │
└─────────────────────────────┘    └──────────────────────────┘
```

## Step 1: Domain and Zone Setup

### 1.1 Add Domain to Cloudflare

1. Log in to Cloudflare Dashboard
2. Click "Add a Site"
3. Enter `woood-delivery.com`
4. Select plan and complete setup
5. Update nameservers at domain registrar

### 1.2 Verify Domain Status

```bash
# Check domain status
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

## Step 2: DNS Configuration

### 2.1 Create DNS Records via Cloudflare Dashboard

**Production API Domain:**
```
Type: CNAME
Name: api
Content: woood-delivery-api.workers.dev
Proxy Status: ✅ Proxied (Orange Cloud)
TTL: Auto
```

**Staging API Domain:**
```
Type: CNAME
Name: staging-api
Content: woood-delivery-api-staging.workers.dev
Proxy Status: ✅ Proxied (Orange Cloud)
TTL: Auto
```

### 2.2 Create DNS Records via CLI

```bash
# Get Zone ID
ZONE_ID=$(wrangler whoami | grep "Zone ID" | cut -d: -f2 | xargs)

# Create production API record
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "CNAME",
    "name": "api",
    "content": "woood-delivery-api.workers.dev",
    "proxied": true
  }'

# Create staging API record
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "CNAME",
    "name": "staging-api",
    "content": "woood-delivery-api-staging.workers.dev",
    "proxied": true
  }'
```

### 2.3 Verify DNS Propagation

```bash
# Check DNS resolution
dig api.woood-delivery.com
dig staging-api.woood-delivery.com

# Test with curl
curl -I https://api.woood-delivery.com/health
curl -I https://staging-api.woood-delivery.com/health
```

## Step 3: Workers Route Configuration

### 3.1 Configure Routes via Wrangler

The routes are already configured in `wrangler.toml`:

```toml
# Production routes
[[env.production.routes]]
pattern = "api.woood-delivery.com/*"
zone_name = "woood-delivery.com"

# Staging routes
[[env.staging.routes]]
pattern = "staging-api.woood-delivery.com/*"
zone_name = "woood-delivery.com"
```

### 3.2 Deploy with Custom Routes

```bash
# Deploy to staging with custom domain
wrangler deploy --env staging

# Deploy to production with custom domain
wrangler deploy --env production
```

### 3.3 Verify Route Configuration

```bash
# List current routes
wrangler routes list --env production
wrangler routes list --env staging

# Test endpoints
curl https://api.woood-delivery.com/health
curl https://staging-api.woood-delivery.com/health
```

## Step 4: SSL/TLS Configuration

### 4.1 Universal SSL Certificate

Cloudflare automatically provides Universal SSL certificates for custom domains:

- **Certificate Type**: Universal SSL (Let's Encrypt)
- **Encryption Mode**: Full (strict) recommended
- **Certificate Transparency**: Enabled
- **Automatic HTTPS Rewrites**: Enabled

### 4.2 Configure SSL Settings

1. Go to Cloudflare Dashboard → SSL/TLS
2. Set encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"
4. Enable "HTTP Strict Transport Security (HSTS)"

### 4.3 HSTS Configuration

```bash
# HSTS headers are automatically added by Cloudflare when enabled
# Additional security headers are added by the Worker code:
# - Strict-Transport-Security: max-age=31536000; includeSubDomains
# - Content-Security-Policy: default-src 'self'
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - X-XSS-Protection: 1; mode=block
```

## Step 5: Custom Domain Verification

### 5.1 Health Check Tests

```bash
# Test production API
curl -v https://api.woood-delivery.com/health

# Test staging API
curl -v https://staging-api.woood-delivery.com/health

# Test delivery dates endpoint
curl "https://api.woood-delivery.com/api/delivery-dates/available?postalCode=1234AB&country=NL"
```

### 5.2 SSL Certificate Verification

```bash
# Check SSL certificate details
openssl s_client -connect api.woood-delivery.com:443 -servername api.woood-delivery.com

# Check certificate expiration
echo | openssl s_client -connect api.woood-delivery.com:443 2>/dev/null | openssl x509 -noout -dates
```

### 5.3 Security Headers Verification

```bash
# Check security headers
curl -I https://api.woood-delivery.com/health

# Expected headers:
# strict-transport-security: max-age=31536000; includeSubDomains
# content-security-policy: default-src 'self'
# x-content-type-options: nosniff
# x-frame-options: DENY
# x-xss-protection: 1; mode=block
```

## Step 6: Performance and Analytics

### 6.1 Enable Analytics

Analytics are automatically enabled via `wrangler.toml`:

```toml
[env.production.observability]
enabled = true
head_sampling_rate = 0.01

[[env.production.analytics_engine_datasets.bindings]]
name = "WORKER_ANALYTICS"
dataset = "woood_delivery_analytics_prod"
```

### 6.2 Custom Metrics Dashboard

1. Go to Cloudflare Dashboard → Analytics & Logs → Workers
2. Select the production worker
3. View metrics:
   - Request volume
   - Response times
   - Error rates
   - Geographic distribution

### 6.3 Set Up Alerts

Configure alerts in Cloudflare Dashboard:

```yaml
Error Rate Alert:
  - Condition: Error rate > 5%
  - Duration: 5 minutes
  - Notification: Email, Slack

Response Time Alert:
  - Condition: 95th percentile > 1000ms
  - Duration: 5 minutes
  - Notification: Email, PagerDuty

Request Volume Alert:
  - Condition: Requests drop > 50%
  - Duration: 10 minutes
  - Notification: Email, Slack
```

## Step 7: Maintenance and Monitoring

### 7.1 Regular Checks

```bash
# Weekly health checks
./scripts/health-check.sh production
./scripts/health-check.sh staging

# Monthly SSL certificate checks
./scripts/ssl-check.sh api.woood-delivery.com
./scripts/ssl-check.sh staging-api.woood-delivery.com
```

### 7.2 Certificate Renewal

- Universal SSL certificates auto-renew every 90 days
- Cloudflare handles renewal automatically
- Monitor certificate expiration via alerts

### 7.3 DNS Monitoring

```bash
# Monitor DNS resolution
./scripts/dns-monitor.sh api.woood-delivery.com
./scripts/dns-monitor.sh staging-api.woood-delivery.com
```

## Troubleshooting

### Common Issues

**1. DNS Not Resolving**
```bash
# Check nameservers
dig NS woood-delivery.com

# Verify Cloudflare nameservers are set at registrar
# Expected: something.ns.cloudflare.com
```

**2. SSL Certificate Issues**
```bash
# Check certificate chain
openssl s_client -connect api.woood-delivery.com:443 -showcerts

# Force certificate refresh in Cloudflare Dashboard
# SSL/TLS → Edge Certificates → Universal SSL → Disable/Enable
```

**3. Worker Route Not Working**
```bash
# Verify route configuration
wrangler routes list --env production

# Check worker deployment
wrangler status --env production

# Test worker directly
curl https://woood-delivery-api.workers.dev/health
```

**4. CORS Issues**
```bash
# Test CORS headers
curl -H "Origin: https://checkout.shopify.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://api.woood-delivery.com/api/delivery-dates/available
```

### Emergency Procedures

**Domain Rollback:**
```bash
# Temporarily point to workers.dev
# Update DNS records to point directly to worker
# This bypasses custom domain issues
```

**Certificate Issues:**
```bash
# Temporarily disable proxy (orange cloud)
# Use DNS-only mode while investigating
# Re-enable proxy after resolution
```

## Security Considerations

### 1. API Key Management
- Store sensitive credentials as Wrangler secrets
- Never commit API keys to version control
- Rotate keys regularly

### 2. CORS Configuration
- Restrict origins to known Shopify domains
- Validate request origins in worker code
- Log and monitor CORS violations

### 3. Rate Limiting
- Monitor rate limiting effectiveness
- Adjust limits based on legitimate traffic patterns
- Set up alerts for excessive rate limiting

### 4. DDoS Protection
- Cloudflare provides automatic DDoS protection
- Custom rate limiting in worker provides additional protection
- Monitor for unusual traffic patterns

## Support Contacts

- **Cloudflare Support**: support.cloudflare.com
- **DNS Issues**: dns-team@company.com
- **Security Issues**: security@company.com
- **Emergency Contact**: on-call@company.com

---

**Last Updated**: January 2024
**Version**: 1.0
**Next Review**: March 2024