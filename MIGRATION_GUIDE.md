# WOOOD Delivery API: Vercel to Cloudflare Workers Migration Guide

## Overview

This guide provides step-by-step instructions for migrating the WOOOD Delivery API from Vercel to Cloudflare Workers, including DNS changes, rollback procedures, and cost analysis.

## Migration Benefits

### 🚀 Performance Improvements
- **Global Edge Network**: 300+ locations worldwide vs single region deployment
- **Cold Start Reduction**: V8 isolates vs Docker containers (~100x faster startup)
- **Response Time**: <50ms globally vs regional latency (100-500ms)
- **Built-in Caching**: KV storage vs in-memory cache (lost on restart)

### 💰 Cost Optimization
| Aspect | Vercel | Cloudflare Workers | Savings |
|--------|--------|-------------------|---------|
| **Base Cost** | $20/month | $5/month | 75% |
| **Requests** | 100k included | 100k included | Equal |
| **Bandwidth** | 100GB included | Unlimited | 100% |
| **Edge Locations** | Limited | 300+ global | Included |
| **KV Storage** | Not included | 1GB included | $10/month |
| **Analytics** | Limited | Full analytics | $20/month |
| **DDoS Protection** | Basic | Enterprise-level | $100/month |

**Estimated Monthly Savings**: $125-155 (75-80% reduction)

### 🛡️ Enhanced Reliability
- **99.99% Uptime SLA**: Cloudflare's global network vs 99.95% Vercel
- **DDoS Protection**: Built-in enterprise-level security
- **Auto-scaling**: Handles traffic spikes automatically
- **Geographic Redundancy**: Automatic failover across regions

## Pre-Migration Checklist

### ✅ Prerequisites
- [ ] Cloudflare account with Workers plan
- [ ] Domain access for DNS changes
- [ ] Backup of current Vercel deployment
- [ ] DutchNed API credentials
- [ ] Access to Shopify extension settings
- [ ] Staging environment for testing

### ✅ Planning
- [ ] Migration timeline defined
- [ ] Rollback procedure tested
- [ ] Stakeholder notification plan
- [ ] Performance benchmarks established
- [ ] Monitoring setup prepared

## Step-by-Step Migration

### Phase 1: Preparation (Time: 1-2 hours)

#### 1.1 Backup Current State

```bash
# 1. Export current Vercel configuration
vercel env ls --scope production > vercel-env-backup.txt

# 2. Backup current deployment
vercel list --scope production > vercel-deployments-backup.txt

# 3. Test current API endpoints
curl https://woood-dutchned.vercel.app/health > health-backup.json
curl https://woood-dutchned.vercel.app/api/delivery-dates/available > api-backup.json

# 4. Document current performance
node scripts/performance-test.ts > pre-migration-performance.txt
```

#### 1.2 Prepare Workers Environment

```bash
# 1. Navigate to Workers directory
cd workers

# 2. Install dependencies
yarn install

# 3. Authenticate with Cloudflare
wrangler auth login

# 4. Verify authentication
wrangler whoami
```

#### 1.3 Create KV Namespaces

```bash
# Production namespaces
wrangler kv:namespace create "DELIVERY_CACHE" --env production
wrangler kv:namespace create "DELIVERY_CACHE" --env production --preview

# Staging namespaces
wrangler kv:namespace create "DELIVERY_CACHE" --env staging
wrangler kv:namespace create "DELIVERY_CACHE" --env staging --preview
```

Update `wrangler.toml` with the returned namespace IDs.

#### 1.4 Configure Secrets

```bash
# Get DutchNed credentials from Vercel
vercel env pull .env.production --scope production

# Set Workers secrets
wrangler secret put DUTCHNED_API_CREDENTIALS --env production
wrangler secret put DUTCHNED_API_CREDENTIALS --env staging

# Optional: Set additional secrets
wrangler secret put EXTERNAL_ERROR_REPORTING_TOKEN --env production
wrangler secret put WEBHOOK_SECRET --env production
```

### Phase 2: Staging Deployment (Time: 30 minutes)

#### 2.1 Deploy to Staging

```bash
# 1. Build and deploy staging
wrangler deploy --env staging

# 2. Verify deployment
curl https://woood-delivery-api-staging.workers.dev/health

# 3. Test all endpoints
yarn workers:test:endpoints:staging
```

#### 2.2 Configure Staging Domain (Optional)

```bash
# 1. Add DNS record for staging
# staging-api.woood-delivery.com -> CNAME -> woood-delivery-api-staging.workers.dev

# 2. Test custom domain
curl https://staging-api.woood-delivery.com/health
```

#### 2.3 Run Integration Tests

```bash
# 1. Set staging URL
export WORKERS_URL=https://woood-delivery-api-staging.workers.dev

# 2. Run comprehensive tests
yarn test:integration

# 3. Run performance comparison
WORKERS_URL=https://woood-delivery-api-staging.workers.dev \
VERCEL_URL=https://woood-dutchned.vercel.app \
yarn test:performance
```

### Phase 3: Production Deployment (Time: 15 minutes)

#### 3.1 Deploy to Production

```bash
# 1. Final validation of staging
yarn workers:test:endpoints:staging

# 2. Deploy to production
wrangler deploy --env production

# 3. Verify production deployment
curl https://woood-delivery-api.workers.dev/health

# 4. Test production endpoints
yarn workers:test:endpoints:production
```

#### 3.2 Performance Validation

```bash
# 1. Run performance tests
WORKERS_URL=https://woood-delivery-api.workers.dev \
yarn test:performance

# 2. Monitor initial performance
yarn monitor:production

# 3. Compare with pre-migration baseline
diff pre-migration-performance.txt post-migration-performance.txt
```

### Phase 4: DNS Cutover (Time: 5-10 minutes)

#### 4.1 Prepare DNS Changes

Current DNS:
```
api.woood-delivery.com -> CNAME -> woood-dutchned.vercel.app
```

New DNS:
```
api.woood-delivery.com -> CNAME -> woood-delivery-api.workers.dev
```

#### 4.2 Execute DNS Changes

```bash
# 1. Lower TTL before migration (1 hour before)
# api.woood-delivery.com -> TTL 300 seconds

# 2. Update CNAME record
# api.woood-delivery.com -> CNAME -> woood-delivery-api.workers.dev

# 3. Verify DNS propagation
dig api.woood-delivery.com CNAME
nslookup api.woood-delivery.com

# 4. Test new domain
curl https://api.woood-delivery.com/health
```

#### 4.3 Immediate Validation

```bash
# 1. Test all endpoints on new domain
WORKERS_URL=https://api.woood-delivery.com yarn test:integration

# 2. Monitor error rates
wrangler tail --env production

# 3. Check analytics
wrangler analytics --env production
```

### Phase 5: Extension Updates (Time: 10 minutes)

#### 5.1 Update Extension Settings (If Needed)

Extensions are already configured to use the custom domain through merchant settings:
- API Base URL: `https://api.woood-delivery.com`
- Mock Mode: `false`

#### 5.2 Verify Extension Compatibility

```bash
# 1. Test extension workflow
WORKERS_URL=https://api.woood-delivery.com yarn test:integration:workflow

# 2. Monitor extension-specific endpoints
wrangler tail --env production | grep "checkout.shopify.com"

# 3. Check CORS functionality
curl -H "Origin: https://checkout.shopify.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://api.woood-delivery.com/api/delivery-dates/available
```

### Phase 6: Monitoring and Validation (Time: 30 minutes)

#### 6.1 Setup Monitoring

```bash
# 1. Start continuous monitoring
yarn monitor:production

# 2. Setup alerting (if not already configured)
# Configure in Cloudflare Dashboard -> Notifications

# 3. Monitor key metrics
wrangler analytics --env production
```

#### 6.2 Performance Validation

Key metrics to monitor:

| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| **Response Time** | <100ms average | >500ms |
| **Error Rate** | <1% | >5% |
| **Availability** | >99.99% | <99.95% |
| **Cache Hit Rate** | >80% | <70% |

#### 6.3 Business Validation

```bash
# 1. Test delivery date fetching
curl https://api.woood-delivery.com/api/delivery-dates/available?postalCode=1000AA

# 2. Test shipping method processing
curl -X POST https://api.woood-delivery.com/api/shipping-methods/process \
     -H "Content-Type: application/json" \
     -d '{"shippingMethod":"32 - EXPEDITIE 2-MANS","cartId":"test"}'

# 3. Monitor business metrics
# - Delivery date API usage
# - Shipping method selections
# - Error tracking
```

## Rollback Procedures

### Immediate Rollback (Emergency - 2 minutes)

If critical issues are detected:

```bash
# 1. Revert DNS immediately
# api.woood-delivery.com -> CNAME -> woood-dutchned.vercel.app

# 2. Verify Vercel is still running
curl https://woood-dutchned.vercel.app/health

# 3. Monitor traffic return to Vercel
# Check Vercel analytics dashboard

# 4. Notify team
echo "EMERGENCY: Rolled back to Vercel due to critical issue" | \
  mail -s "Migration Rollback" alerts@woood.com
```

### Planned Rollback (5-10 minutes)

If issues are identified during monitoring:

```bash
# 1. Document issues
echo "Rollback reason: [describe issues]" > rollback-reason.txt

# 2. Capture Workers state for analysis
wrangler analytics --env production > rollback-analytics.txt
wrangler tail --env production > rollback-logs.txt &

# 3. Revert DNS
# api.woood-delivery.com -> CNAME -> woood-dutchned.vercel.app

# 4. Verify Vercel functionality
yarn workers:test:endpoints:production # Should now test Vercel

# 5. Stop Workers monitoring
kill %1  # Stop log tailing

# 6. Cleanup Workers resources (optional)
# Keep Workers deployment for analysis but stop incurring costs
```

### Post-Rollback Analysis

```bash
# 1. Analyze what went wrong
diff pre-migration-performance.txt post-migration-performance.txt
grep ERROR rollback-logs.txt

# 2. Plan fixes
# - Review error logs
# - Identify configuration issues
# - Update migration plan

# 3. Schedule retry
# - Fix identified issues
# - Retest on staging
# - Plan new migration window
```

## Post-Migration Tasks

### Immediate (First 24 hours)

#### Monitor Performance
```bash
# 1. Continuous monitoring
yarn monitor:production

# 2. Performance comparison
node scripts/performance-test.ts > post-migration-performance.txt

# 3. Error rate monitoring
wrangler analytics --env production | grep error_rate
```

#### Validate Business Functions
- [ ] Delivery date API working correctly
- [ ] Shipping method processing functional
- [ ] Extension integration working
- [ ] Error tracking operational
- [ ] Cache hit rates optimal

### Short-term (First week)

#### Optimize Performance
```bash
# 1. Analyze cache performance
wrangler kv:key list --binding=DELIVERY_CACHE --env production

# 2. Optimize cache TTLs based on usage patterns
# Update CACHE_DURATION if needed

# 3. Monitor and adjust rate limits
# Update RATE_LIMIT_MAX_REQUESTS if needed
```

#### Cost Analysis
```bash
# 1. Monitor Workers usage
wrangler analytics --env production

# 2. Compare costs
# Check Cloudflare billing vs previous Vercel costs

# 3. Validate savings projections
# Document actual vs projected savings
```

### Long-term (First month)

#### Performance Optimization
- [ ] Implement additional caching strategies
- [ ] Optimize response sizes
- [ ] Fine-tune retry logic
- [ ] Monitor geographic performance

#### Security Hardening
- [ ] Review rate limiting effectiveness
- [ ] Implement additional security headers
- [ ] Monitor for unusual traffic patterns
- [ ] Regular security audits

#### Documentation Updates
- [ ] Update deployment procedures
- [ ] Document lessons learned
- [ ] Update runbooks
- [ ] Train team on Workers operations

## Legacy Cleanup

### Vercel Cleanup (After 1 week)

```bash
# 1. Verify Workers stability
# Confirm no rollbacks needed for 1 week

# 2. Scale down Vercel deployment
vercel remove woood-dutchned --scope production

# 3. Archive Vercel configuration
mkdir legacy/vercel-config
mv vercel.json legacy/vercel-config/
mv DEPLOYMENT.md legacy/vercel-config/DEPLOYMENT.md

# 4. Update documentation
# Remove Vercel references from README.md
```

### Repository Cleanup (After 2 weeks)

```bash
# 1. Move backend to legacy
mkdir -p legacy
mv backend legacy/

# 2. Update package.json
# Remove Vercel-specific scripts
# Update build scripts to focus on Workers

# 3. Update README.md
# Reflect Workers as primary backend
# Archive Vercel documentation

# 4. Clean up environment files
rm .env.production
rm vercel-*.txt
```

## Troubleshooting Migration Issues

### Common Issues and Solutions

#### 1. DNS Propagation Delays

**Symptoms**: Some users still hitting Vercel after DNS change

**Solution**:
```bash
# 1. Check DNS propagation globally
dig +trace api.woood-delivery.com

# 2. Monitor both endpoints temporarily
# Keep both Vercel and Workers running during transition

# 3. Use DNS flush for testing
sudo dscacheutil -flushcache  # macOS
ipconfig /flushdns             # Windows
```

#### 2. CORS Issues

**Symptoms**: Browser errors from Shopify checkout

**Solution**:
```bash
# 1. Verify CORS configuration
curl -H "Origin: https://checkout.shopify.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS https://api.woood-delivery.com/health

# 2. Check Workers CORS headers
wrangler tail --env production | grep "Access-Control"

# 3. Update CORS configuration if needed
# Edit workers/src/utils/cors.ts
```

#### 3. Performance Degradation

**Symptoms**: Slower response times than Vercel

**Investigation**:
```bash
# 1. Compare response times
time curl https://api.woood-delivery.com/health
time curl https://woood-dutchned.vercel.app/health

# 2. Check Workers analytics
wrangler analytics --env production

# 3. Monitor DutchNed API performance
curl -w "@curl-format.txt" https://eekhoorn-connector.dutchned.com/api/health
```

**Solutions**:
- Enable/optimize caching
- Reduce API timeout
- Check network routes to DutchNed

#### 4. Cache Issues

**Symptoms**: High cache miss rates, slow responses

**Investigation**:
```bash
# 1. Check cache keys
wrangler kv:key list --binding=DELIVERY_CACHE --env production

# 2. Verify cache hit rates
wrangler analytics --env production | grep cache

# 3. Test cache functionality
curl https://api.woood-delivery.com/api/delivery-dates/available
curl https://api.woood-delivery.com/api/delivery-dates/available  # Should be cached
```

**Solutions**:
```bash
# 1. Clear corrupted cache
wrangler kv:key delete "problematic_key" --binding=DELIVERY_CACHE --env production

# 2. Adjust cache TTL
# Update CACHE_DURATION environment variable

# 3. Verify KV namespace configuration
wrangler kv:namespace list
```

## Success Metrics

### Performance Metrics
- [ ] **Response Time**: <100ms average (vs 200-500ms Vercel)
- [ ] **Global Performance**: <50ms from major cities
- [ ] **Cache Hit Rate**: >80%
- [ ] **Uptime**: >99.99%

### Business Metrics
- [ ] **API Success Rate**: >99%
- [ ] **Extension Functionality**: 100% working
- [ ] **User Experience**: No degradation
- [ ] **Error Rate**: <1%

### Cost Metrics
- [ ] **Monthly Savings**: 75-80% reduction
- [ ] **Performance per Dollar**: 5-10x improvement
- [ ] **Operational Overhead**: Reduced maintenance

### Operational Metrics
- [ ] **Deployment Time**: <5 minutes
- [ ] **Rollback Time**: <2 minutes
- [ ] **Monitoring**: Real-time visibility
- [ ] **Alerting**: Proactive issue detection

## Migration Timeline Summary

| Phase | Duration | Critical Path |
|-------|----------|---------------|
| **Preparation** | 1-2 hours | KV namespace creation, secrets |
| **Staging** | 30 minutes | Deployment, testing |
| **Production** | 15 minutes | Deployment, validation |
| **DNS Cutover** | 5-10 minutes | DNS change, propagation |
| **Extension Updates** | 10 minutes | Settings verification |
| **Monitoring** | 30 minutes | Initial validation |
| **Total** | 2.5-3.5 hours | End-to-end migration |

## Contact and Support

### Migration Team
- **Technical Lead**: [Technical Lead Name]
- **DevOps**: [DevOps Engineer Name]
- **Business Owner**: [Business Owner Name]

### Emergency Contacts
- **Migration Issues**: [Phone/Email]
- **DNS Changes**: [DNS Provider Contact]
- **Cloudflare Support**: [Support Plan Contact]

### Post-Migration Support
- **Documentation**: This guide + `/workers/DEPLOYMENT.md`
- **Monitoring**: Cloudflare Dashboard + Custom scripts
- **Troubleshooting**: See DEPLOYMENT.md troubleshooting section

---

**Migration Status**: ✅ Ready for Execution
**Risk Level**: Low (Comprehensive rollback procedures in place)
**Expected Benefits**: 75-80% cost reduction, 2-5x performance improvement
**Timeline**: 2.5-3.5 hours total migration window