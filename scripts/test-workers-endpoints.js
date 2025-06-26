#!/usr/bin/env node

/**
 * WOOOD Delivery API - Workers Endpoint Testing Script
 * Comprehensive testing of all API endpoints for deployment validation
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

const BASE_URL = ENDPOINTS[WORKER_ENV];

if (!BASE_URL) {
  console.error(`❌ Unknown environment: ${WORKER_ENV}`);
  process.exit(1);
}

console.log(`🧪 Testing WOOOD Delivery API Workers - ${WORKER_ENV.toUpperCase()}`);
console.log(`📍 Base URL: ${BASE_URL}\n`);

// Test cases
const TEST_CASES = [
  {
    name: 'Health Check',
    method: 'GET',
    path: '/health',
    expectedStatus: 200,
    expectedFields: ['status', 'timestamp', 'version'],
    timeout: 5000
  },
  {
    name: 'Delivery Dates - Basic Request',
    method: 'GET',
    path: '/api/delivery-dates/available',
    expectedStatus: 200,
    expectedFields: ['success', 'data'],
    timeout: 15000
  },
  {
    name: 'Delivery Dates - With Postal Code',
    method: 'GET',
    path: '/api/delivery-dates/available?postalCode=1234AB&country=NL',
    expectedStatus: 200,
    expectedFields: ['success', 'data'],
    timeout: 15000
  },
  {
    name: 'Shipping Methods - Process Request',
    method: 'POST',
    path: '/api/shipping-methods/process',
    body: {
      shippingMethod: '32 - EXPEDITIE 2-MANS',
      cartId: 'test-cart-123',
      customerId: 'test-customer-456'
    },
    expectedStatus: 200,
    expectedFields: ['success'],
    timeout: 10000
  },
  {
    name: 'Shipping Methods - Retrieve',
    method: 'GET',
    path: '/api/shipping-methods/test-cart-123',
    expectedStatus: 200,
    expectedFields: ['success'],
    timeout: 10000
  },
  {
    name: 'Order Metafields - Save',
    method: 'POST',
    path: '/api/order-metafields/save',
    body: {
      deliveryDate: '2024-02-15',
      shippingMethod: '32 - EXPEDITIE 2-MANS',
      orderId: 'test-order-789'
    },
    expectedStatus: 200,
    expectedFields: ['success'],
    timeout: 10000
  },
  {
    name: 'Error Tracking',
    method: 'POST',
    path: '/api/errors/track',
    body: {
      error: 'TEST_ERROR',
      message: 'Test error message for endpoint validation',
      stack: 'Error: Test error\n    at test',
      userAgent: 'WOOOD-Test-Script/1.0',
      url: BASE_URL + '/test',
      timestamp: new Date().toISOString()
    },
    expectedStatus: 200,
    expectedFields: ['success'],
    timeout: 10000
  },
  {
    name: 'Not Found - 404 Test',
    method: 'GET',
    path: '/api/nonexistent-endpoint',
    expectedStatus: 404,
    expectedFields: ['success', 'error'],
    timeout: 5000
  },
  {
    name: 'CORS Preflight',
    method: 'OPTIONS',
    path: '/api/delivery-dates/available',
    headers: {
      'Origin': 'https://checkout.shopify.com',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Content-Type'
    },
    expectedStatus: 200,
    timeout: 5000
  }
];

// Test execution
async function runTest(testCase) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const url = new URL(testCase.path, BASE_URL);
    
    const options = {
      method: testCase.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'WOOOD-Test-Script/1.0',
        ...testCase.headers
      },
      timeout: testCase.timeout
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        try {
          let responseData = null;
          if (data && res.headers['content-type']?.includes('application/json')) {
            responseData = JSON.parse(data);
          }
          
          const result = validateResponse(testCase, res, responseData, duration);
          resolve(result);
        } catch (error) {
          resolve({
            name: testCase.name,
            success: false,
            error: `JSON Parse Error: ${error.message}`,
            duration,
            status: res.statusCode
          });
        }
      });
    });

    req.on('error', (error) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      resolve({
        name: testCase.name,
        success: false,
        error: `Request Error: ${error.message}`,
        duration,
        status: null
      });
    });

    req.on('timeout', () => {
      req.destroy();
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      resolve({
        name: testCase.name,
        success: false,
        error: `Request Timeout (${testCase.timeout}ms)`,
        duration,
        status: null
      });
    });

    // Send request body for POST requests
    if (testCase.body) {
      req.write(JSON.stringify(testCase.body));
    }
    
    req.end();
  });
}

function validateResponse(testCase, response, data, duration) {
  const errors = [];
  
  // Check status code
  if (response.statusCode !== testCase.expectedStatus) {
    errors.push(`Expected status ${testCase.expectedStatus}, got ${response.statusCode}`);
  }
  
  // Check required fields (only for JSON responses)
  if (testCase.expectedFields && data && typeof data === 'object') {
    for (const field of testCase.expectedFields) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  
  // Check response headers for specific tests
  if (testCase.name === 'CORS Preflight') {
    const corsHeaders = [
      'access-control-allow-origin',
      'access-control-allow-methods'
    ];
    
    for (const header of corsHeaders) {
      if (!response.headers[header]) {
        errors.push(`Missing CORS header: ${header}`);
      }
    }
  }
  
  // Performance check
  const performanceWarnings = [];
  if (duration > 2000) {
    performanceWarnings.push(`Slow response: ${duration}ms`);
  }
  
  return {
    name: testCase.name,
    success: errors.length === 0,
    status: response.statusCode,
    duration,
    errors,
    warnings: performanceWarnings,
    data: data ? (typeof data === 'object' ? Object.keys(data) : 'non-json') : null
  };
}

async function runAllTests() {
  console.log(`Running ${TEST_CASES.length} test cases...\n`);
  
  const results = [];
  let passCount = 0;
  let failCount = 0;
  
  for (const testCase of TEST_CASES) {
    process.stdout.write(`⏳ ${testCase.name}... `);
    
    const result = await runTest(testCase);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ PASS (${result.duration}ms)`);
      passCount++;
    } else {
      console.log(`❌ FAIL (${result.duration}ms)`);
      console.log(`   Error: ${result.error || result.errors.join(', ')}`);
      failCount++;
    }
    
    if (result.warnings && result.warnings.length > 0) {
      console.log(`   ⚠️  Warning: ${result.warnings.join(', ')}`);
    }
  }
  
  // Summary
  console.log(`\n📊 Test Summary for ${WORKER_ENV.toUpperCase()}`);
  console.log(`═══════════════════════════════════════════`);
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📝 Total:  ${TEST_CASES.length}`);
  console.log(`🎯 Success Rate: ${Math.round((passCount / TEST_CASES.length) * 100)}%`);
  
  // Performance summary
  const durations = results.map(r => r.duration);
  const avgDuration = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
  const maxDuration = Math.max(...durations);
  const minDuration = Math.min(...durations);
  
  console.log(`\n⚡ Performance Summary`);
  console.log(`═══════════════════════`);
  console.log(`Average: ${avgDuration}ms`);
  console.log(`Fastest: ${minDuration}ms`);
  console.log(`Slowest: ${maxDuration}ms`);
  
  // Environment-specific notes
  if (WORKER_ENV === 'production') {
    console.log(`\n🏭 Production Environment Notes:`);
    console.log(`- SSL/TLS: ${results.find(r => r.name === 'Health Check')?.success ? '✅ Valid' : '❌ Invalid'}`);
    console.log(`- Custom Domain: ${BASE_URL.includes('api.woood-delivery.com') ? '✅ Active' : '❌ Using workers.dev'}`);
    console.log(`- CORS: ${results.find(r => r.name === 'CORS Preflight')?.success ? '✅ Configured' : '❌ Issues detected'}`);
  }
  
  if (WORKER_ENV === 'staging') {
    console.log(`\n🧪 Staging Environment Notes:`);
    console.log(`- Debug Mode: Expected to be enabled`);
    console.log(`- Rate Limiting: Should be more permissive than production`);
    console.log(`- Analytics: Should be collecting data`);
  }
  
  // Exit with appropriate code
  if (failCount > 0) {
    console.log(`\n❌ ${failCount} test(s) failed. Please review the errors above.`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All tests passed! The ${WORKER_ENV} environment is working correctly.`);
    process.exit(0);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
WOOOD Delivery API - Workers Endpoint Testing Script

Usage:
  node test-workers-endpoints.js [options]

Environment Variables:
  WORKER_ENV   Target environment (development|staging|production)

Options:
  --help, -h   Show this help message

Examples:
  # Test development environment
  node test-workers-endpoints.js

  # Test staging environment
  WORKER_ENV=staging node test-workers-endpoints.js

  # Test production environment
  WORKER_ENV=production node test-workers-endpoints.js
`);
  process.exit(0);
}

// Run tests
runAllTests().catch((error) => {
  console.error(`\n💥 Unexpected error: ${error.message}`);
  process.exit(1);
}); 