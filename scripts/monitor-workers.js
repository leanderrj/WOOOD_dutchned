#!/usr/bin/env node

/**
 * WOOOD Delivery API - Workers Monitoring Script
 * Monitors health, performance, and key metrics of deployed Workers
 */

const https = require('https');
const { URL } = require('url');

// Configuration
const WORKER_ENV = process.env.WORKER_ENV || 'development';

const ENDPOINTS = {
  development: 'https://woood-delivery-api.workers.dev',
  staging: 'https://woood-delivery-api-staging.workers.dev',
  production: 'https://api.woood-delivery.com'
};

const BASE_URL = ENDPOINTS[WORKER_ENV] || ENDPOINTS.development;

console.log(`📊 WOOOD Delivery API Workers Monitoring - ${WORKER_ENV.toUpperCase()}`);
console.log(`📍 Base URL: ${BASE_URL}\n`);

// Monitoring checks
const MONITORING_CHECKS = [
  {
    name: 'Health Check',
    path: '/health',
    method: 'GET',
    frequency: 30000, // 30 seconds
    timeout: 5000,
    critical: true
  },
  {
    name: 'Delivery Dates Performance',
    path: '/api/delivery-dates/available?postalCode=1234AB',
    method: 'GET',
    frequency: 60000, // 1 minute
    timeout: 15000,
    critical: false
  },
  {
    name: 'API Response Time',
    path: '/health',
    method: 'GET',
    frequency: 10000, // 10 seconds
    timeout: 2000,
    critical: false
  }
];

// Global state
const metrics = {
  checks: {},
  alerts: [],
  startTime: Date.now()
};

// Initialize metrics for each check
MONITORING_CHECKS.forEach(check => {
  metrics.checks[check.name] = {
    successCount: 0,
    failureCount: 0,
    totalRequests: 0,
    responseTimes: [],
    lastCheck: null,
    lastSuccess: null,
    lastFailure: null,
    consecutiveFailures: 0
  };
});

// HTTP request helper
function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        try {
          const jsonData = data ? JSON.parse(data) : null;
          resolve({
            success: true,
            statusCode: res.statusCode,
            responseTime,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            success: res.statusCode >= 200 && res.statusCode < 300,
            statusCode: res.statusCode,
            responseTime,
            data: data,
            headers: res.headers,
            parseError: error.message
          });
        }
      });
    });

    req.on('error', (error) => {
      const endTime = Date.now();
      reject({
        success: false,
        error: error.message,
        responseTime: endTime - startTime
      });
    });

    req.setTimeout(options.timeout || 10000, () => {
      req.destroy();
      const endTime = Date.now();
      reject({
        success: false,
        error: 'Request timeout',
        responseTime: endTime - startTime
      });
    });

    req.end();
  });
}

// Perform monitoring check
async function performCheck(check) {
  const url = new URL(check.path, BASE_URL);
  const options = {
    method: check.method,
    timeout: check.timeout,
    headers: {
      'User-Agent': 'WOOOD-Monitor/1.0'
    }
  };

  try {
    const result = await makeRequest(url, options);
    const checkMetrics = metrics.checks[check.name];
    
    checkMetrics.totalRequests++;
    checkMetrics.lastCheck = new Date().toISOString();
    checkMetrics.responseTimes.push(result.responseTime);
    
    // Keep only last 100 response times for memory efficiency
    if (checkMetrics.responseTimes.length > 100) {
      checkMetrics.responseTimes = checkMetrics.responseTimes.slice(-100);
    }

    if (result.success && result.statusCode >= 200 && result.statusCode < 300) {
      checkMetrics.successCount++;
      checkMetrics.lastSuccess = new Date().toISOString();
      checkMetrics.consecutiveFailures = 0;
      
      console.log(`✅ ${check.name}: OK (${result.responseTime}ms)`);
      
      // Clear any existing alerts for this check
      clearAlert(check.name);
    } else {
      checkMetrics.failureCount++;
      checkMetrics.lastFailure = new Date().toISOString();
      checkMetrics.consecutiveFailures++;
      
      console.log(`❌ ${check.name}: FAIL (${result.statusCode}) (${result.responseTime}ms)`);
      
      // Generate alert
      generateAlert(check, result);
    }
    
    // Performance warnings
    if (result.responseTime > 2000) {
      console.log(`⚠️  ${check.name}: Slow response (${result.responseTime}ms)`);
    }
    
  } catch (error) {
    const checkMetrics = metrics.checks[check.name];
    
    checkMetrics.totalRequests++;
    checkMetrics.failureCount++;
    checkMetrics.lastCheck = new Date().toISOString();
    checkMetrics.lastFailure = new Date().toISOString();
    checkMetrics.consecutiveFailures++;
    
    console.log(`💥 ${check.name}: ERROR - ${error.error} (${error.responseTime || 0}ms)`);
    
    // Generate alert
    generateAlert(check, error);
  }
}

// Generate alert
function generateAlert(check, result) {
  const checkMetrics = metrics.checks[check.name];
  
  // Only alert if consecutive failures exceed threshold
  const failureThreshold = check.critical ? 2 : 5;
  
  if (checkMetrics.consecutiveFailures >= failureThreshold) {
    const alert = {
      timestamp: new Date().toISOString(),
      check: check.name,
      severity: check.critical ? 'CRITICAL' : 'WARNING',
      consecutiveFailures: checkMetrics.consecutiveFailures,
      message: `${check.name} has failed ${checkMetrics.consecutiveFailures} consecutive times`,
      details: result
    };
    
    // Avoid duplicate alerts
    const existingAlert = metrics.alerts.find(a => 
      a.check === check.name && 
      a.severity === alert.severity &&
      !a.resolved
    );
    
    if (!existingAlert) {
      metrics.alerts.push(alert);
      console.log(`🚨 ALERT [${alert.severity}]: ${alert.message}`);
      
      // In a real environment, you would send this to your alerting system
      // sendToAlertingSystem(alert);
    }
  }
}

// Clear alert
function clearAlert(checkName) {
  metrics.alerts = metrics.alerts.map(alert => {
    if (alert.check === checkName && !alert.resolved) {
      alert.resolved = true;
      alert.resolvedAt = new Date().toISOString();
      console.log(`✅ RESOLVED: ${alert.message}`);
    }
    return alert;
  });
}

// Display metrics summary
function displayMetrics() {
  console.log('\n' + '='.repeat(60));
  console.log(`📊 MONITORING SUMMARY - ${new Date().toISOString()}`);
  console.log('='.repeat(60));
  
  const uptime = Math.round((Date.now() - metrics.startTime) / 1000);
  console.log(`⏱️  Monitor Uptime: ${Math.floor(uptime / 60)}m ${uptime % 60}s`);
  console.log(`🌐 Environment: ${WORKER_ENV.toUpperCase()}`);
  console.log(`📍 Endpoint: ${BASE_URL}`);
  
  console.log('\n📋 Check Results:');
  MONITORING_CHECKS.forEach(check => {
    const m = metrics.checks[check.name];
    const avgResponseTime = m.responseTimes.length > 0 ? 
      Math.round(m.responseTimes.reduce((a, b) => a + b, 0) / m.responseTimes.length) : 0;
    const successRate = m.totalRequests > 0 ? 
      Math.round((m.successCount / m.totalRequests) * 100) : 0;
    
    console.log(`  ${check.name}:`);
    console.log(`    Success Rate: ${successRate}% (${m.successCount}/${m.totalRequests})`);
    console.log(`    Avg Response: ${avgResponseTime}ms`);
    console.log(`    Consecutive Failures: ${m.consecutiveFailures}`);
    console.log(`    Last Check: ${m.lastCheck || 'Never'}`);
  });
  
  // Active alerts
  const activeAlerts = metrics.alerts.filter(a => !a.resolved);
  if (activeAlerts.length > 0) {
    console.log('\n🚨 Active Alerts:');
    activeAlerts.forEach(alert => {
      console.log(`  [${alert.severity}] ${alert.message}`);
      console.log(`    Since: ${alert.timestamp}`);
    });
  } else {
    console.log('\n✅ No active alerts');
  }
  
  console.log('\n' + '='.repeat(60));
}

// Schedule monitoring checks
function scheduleChecks() {
  MONITORING_CHECKS.forEach(check => {
    // Initial check
    performCheck(check);
    
    // Schedule recurring checks
    setInterval(() => {
      performCheck(check);
    }, check.frequency);
  });
}

// Schedule metrics display
function scheduleMetricsDisplay() {
  setInterval(() => {
    displayMetrics();
  }, 60000); // Every minute
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Monitoring stopped by user');
  displayMetrics();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Monitoring stopped by system');
  displayMetrics();
  process.exit(0);
});

// Main execution
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
WOOOD Delivery API - Workers Monitoring Script

This script continuously monitors the health and performance of deployed Workers.

Usage:
  node monitor-workers.js [options]

Environment Variables:
  WORKER_ENV   Target environment (development|staging|production)

Options:
  --help, -h   Show this help message

Examples:
  # Monitor development environment
  node monitor-workers.js

  # Monitor staging environment
  WORKER_ENV=staging node monitor-workers.js

  # Monitor production environment  
  WORKER_ENV=production node monitor-workers.js

The monitoring will run continuously until stopped with Ctrl+C.
Metrics summary is displayed every minute.
`);
  process.exit(0);
}

console.log('🚀 Starting continuous monitoring...');
console.log('📊 Metrics summary will be displayed every minute');
console.log('🛑 Press Ctrl+C to stop monitoring\n');

scheduleChecks();
scheduleMetricsDisplay();

// Keep the process running
process.stdin.resume(); 