# WOOOD Delivery API - Monitoring and Analytics Setup

This document covers the monitoring and analytics setup for the WOOOD Delivery API Workers deployment.

## Overview

The WOOOD Delivery API uses comprehensive monitoring across multiple layers:

- **Cloudflare Analytics** - Built-in Workers analytics and metrics
- **Analytics Engine** - Custom metrics and business intelligence
- **Real-time Alerts** - Automated notifications for issues
- **Performance Monitoring** - Response times and resource usage
- **Error Tracking** - Structured error reporting and analysis
- **Business Metrics** - Delivery date usage and shipping method trends

## Key Performance Indicators (KPIs)

### System Health KPIs

| Metric | Target | Alert Threshold | Critical Threshold |
|--------|--------|-----------------|-------------------|
| **Availability** | 99.9% | < 99.5% | < 99% |
| **Response Time (95th)** | < 500ms | > 1000ms | > 2000ms |
| **Error Rate** | < 1% | > 3% | > 5% |
| **Cache Hit Rate** | > 80% | < 70% | < 60% |

### Business KPIs

| Metric | Description | Monitoring Frequency |
|--------|-------------|---------------------|
| **Delivery Date Requests** | Total API calls for delivery dates | Real-time |
| **Shipping Method Processing** | Successful shipping method updates | Real-time |
| **Geographic Distribution** | Usage by country/region | Daily |
| **API Usage Patterns** | Peak hours and seasonal trends | Weekly |

## Alerting Configuration

### Critical Alerts

- **Error Rate Alert**: Error rate > 5% for 5 minutes → PagerDuty + Email
- **Response Time Alert**: 95th percentile > 2000ms for 5 minutes → Email + Slack
- **Availability Alert**: Health check failures > 3 consecutive → PagerDuty + SMS

### Warning Alerts

- **High Traffic Alert**: Request rate > 1000 req/min for 10 minutes → Slack
- **Cache Performance Alert**: Cache hit rate < 70% for 15 minutes → Email + Slack
- **DutchNed API Issues**: Fallback usage > 15% for 10 minutes → Email + Slack

## Health Check Monitoring

### Internal Health Check: `/health`

Returns comprehensive service status including DutchNed API availability, cache status, and rate limiter health.

### External Monitoring Services

- **UptimeRobot**: Global monitoring from 13 locations
- **Pingdom**: European monitoring focus  
- **StatusPage**: Public status page integration

### Synthetic Monitoring

1. **Basic Health Check** - Every 30 seconds from 5 locations
2. **Delivery Dates API** - Every 2 minutes with real postal codes
3. **End-to-End Workflow** - Every 5 minutes complete user journey
4. **CORS Functionality** - Every 5 minutes from Shopify domains

## Custom Metrics Collection

Analytics Engine integration collects:
- Request volume and response times
- Error rates by endpoint
- Cache hit/miss ratios
- Geographic usage patterns
- Business metrics (delivery dates, shipping methods)

## Incident Response

### Escalation Matrix

| Severity | Response Time | Notification | Escalation |
|----------|---------------|-------------|------------|
| **Critical** | 5 minutes | PagerDuty + SMS | Engineering Manager |
| **High** | 15 minutes | Email + Slack | Senior Developer |
| **Medium** | 1 hour | Slack | Development Team |
| **Low** | 4 hours | Email | Product Owner |

### Standard Runbooks

**API Outage Response:**
1. Check Cloudflare status page
2. Verify DNS resolution  
3. Test direct worker endpoints
4. Check rate limiting status
5. Validate SSL certificates
6. Escalate to DutchNed if needed

**Performance Degradation Response:**
1. Check response time metrics
2. Analyze error rate patterns
3. Review cache hit rates
4. Check external API status
5. Scale resources if needed
6. Implement graceful degradation

## Monitoring Tools

### Primary Stack
- **Cloudflare Analytics** - Built-in Workers metrics
- **Analytics Engine** - Custom business metrics
- **Grafana** - Custom dashboards and visualization
- **PagerDuty** - Incident management and alerting
- **Slack** - Team notifications and collaboration

### Optional Integrations
- **DataDog** - Advanced APM and infrastructure monitoring
- **New Relic** - Application performance insights
- **Sentry** - Error tracking and performance monitoring

---

**Last Updated:** January 2024  
**Version:** 1.0  
**Next Review:** March 2024

**Contacts:**
- **Operations Team:** ops@woood.com
- **Development Team:** dev@woood.com  
- **Emergency Contact:** on-call@woood.com
