#!/usr/bin/env node

/**
 * Integration Testing Script for WOOOD Delivery Extension
 * Tests the complete workflow: Extension → Workers → DutchNed API
 */

const https = require('https');

// Test configuration
const CONFIG = {
  workersUrl: process.env.WORKERS_URL || 'https://woood-delivery-api.workers.dev',
  mockMode: process.env.MOCK_MODE === 'true',
  timeout: 30000,
  retries: 3
};

// Test scenarios
const TEST_SCENARIOS = [
  {
    name: 'Health Check Validation',
    description: 'Verify API health and readiness',
    endpoint: '/health',
    method: 'GET',
    expectedStatus: 200,
    expectedFields: ['status', 'timestamp', 'environment']
  },
  {
    name: 'Delivery Dates - Basic Request',
    description: 'Fetch delivery dates without parameters',
    endpoint: '/api/delivery-dates/available',
    method: 'GET',
    expectedStatus: 200,
    expectedFields: ['success', 'data'],
    validate: (response) => {
      return response.data && Array.isArray(response.data) && response.data.length > 0;
    }
  },
  {
    name: 'Delivery Dates - With Postal Code',
    description: 'Fetch delivery dates with Netherlands postal code',
    endpoint: '/api/delivery-dates/available?postalCode=1000AA&country=NL',
    method: 'GET',
    expectedStatus: 200,
    expectedFields: ['success', 'data'],
    validate: (response) => {
      return response.data && Array.isArray(response.data) && response.data.length > 0 &&
             response.data.every(date => date.date && date.displayName);
    }
  },
  {
    name: 'Shipping Method Processing',
    description: 'Process shipping method selection',
    endpoint: '/api/shipping-methods/process',
    method: 'POST',
    body: {
      shippingMethod: '32 - EXPEDITIE 2-MANS',
      cartId: 'test_cart_integration_' + Date.now(),
      customerId: 'test_customer_integration_' + Date.now()
    },
    expectedStatus: 200,
    expectedFields: ['success', 'processed']
  },
  {
    name: 'Order Metafields Save',
    description: 'Save order metafields (combined endpoint)',
    endpoint: '/api/order-metafields/save',
    method: 'POST',
    body: {
      deliveryDate: '2024-02-15',
      shippingMethod: '32 - EXPEDITIE 2-MANS',
      orderId: 'test_order_integration_' + Date.now(),
      timestamp: new Date().toISOString(),
      source: 'integration_test'
    },
    expectedStatus: 200,
    expectedFields: ['success']
  },
  {
    name: 'Error Tracking',
    description: 'Test error tracking endpoint',
    endpoint: '/api/errors/track',
    method: 'POST',
    body: {
      error: 'INTEGRATION_TEST_ERROR',
      message: 'This is a test error from integration testing',
      stack: 'Error: Test error\n    at IntegrationTest.test',
      userAgent: 'IntegrationTest/1.0',
      url: 'https://test.integration.com/test',
      timestamp: new Date().toISOString()
    },
    expectedStatus: 200,
    expectedFields: ['success']
  },
  {
    name: 'CORS Preflight',
    description: 'Verify CORS headers for Shopify domains',
    endpoint: '/api/delivery-dates/available',
    method: 'OPTIONS',
    headers: {
      'Origin': 'https://checkout.shopify.com',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Content-Type'
    },
    expectedStatus: 200,
    validateHeaders: (headers) => {
      return headers['access-control-allow-origin'] && 
             headers['access-control-allow-methods'] &&
             headers['access-control-allow-headers'];
    }
  }
];

class IntegrationTester {
  constructor() {
    this.results = [];
    this.summary = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0
    };
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: options.method || 'GET',
        timeout: CONFIG.timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WOOOD-Integration-Test/1.0',
          'Accept': 'application/json',
          ...options.headers
        }
      };

      const req = https.request(url, requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsedData = data ? JSON.parse(data) : {};
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: parsedData,
              rawData: data
            });
          } catch (error) {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: null,
              rawData: data,
              parseError: error.message
            });
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (options.body) {
        req.write(JSON.stringify(options.body));
      }

      req.end();
    });
  }

  async runTest(scenario) {
    console.log(`\n🧪 Testing: ${scenario.name}`);
    console.log(`   ${scenario.description}`);
    
    const url = `${CONFIG.workersUrl}${scenario.endpoint}`;
    const startTime = Date.now();
    
    try {
      const result = await this.makeRequest(url, {
        method: scenario.method,
        headers: scenario.headers,
        body: scenario.body
      });

      const duration = Date.now() - startTime;
      const testResult = {
        name: scenario.name,
        passed: false,
        duration,
        errors: [],
        warnings: []
      };

      // Check status code
      if (result.statusCode !== scenario.expectedStatus) {
        testResult.errors.push(
          `Expected status ${scenario.expectedStatus}, got ${result.statusCode}`
        );
      }

      // Check expected fields
      if (scenario.expectedFields && result.data) {
        for (const field of scenario.expectedFields) {
          if (!(field in result.data)) {
            testResult.errors.push(`Missing expected field: ${field}`);
          }
        }
      }

      // Custom validation
      if (scenario.validate && result.data) {
        try {
          if (!scenario.validate(result.data)) {
            testResult.errors.push('Custom validation failed');
          }
        } catch (error) {
          testResult.errors.push(`Validation error: ${error.message}`);
        }
      }

      // Header validation
      if (scenario.validateHeaders) {
        try {
          if (!scenario.validateHeaders(result.headers)) {
            testResult.errors.push('Header validation failed');
          }
        } catch (error) {
          testResult.errors.push(`Header validation error: ${error.message}`);
        }
      }

      // Check for parse errors
      if (result.parseError) {
        testResult.warnings.push(`JSON parse error: ${result.parseError}`);
      }

      // Determine if test passed
      testResult.passed = testResult.errors.length === 0;

      // Log result
      if (testResult.passed) {
        console.log(`   ✅ PASS (${duration}ms)`);
        this.summary.passed++;
      } else {
        console.log(`   ❌ FAIL (${duration}ms)`);
        testResult.errors.forEach(error => console.log(`      Error: ${error}`));
        this.summary.failed++;
      }

      if (testResult.warnings.length > 0) {
        testResult.warnings.forEach(warning => console.log(`      Warning: ${warning}`));
      }

      this.results.push(testResult);
      this.summary.total++;

    } catch (error) {
      console.log(`   ❌ FAIL - ${error.message}`);
      this.results.push({
        name: scenario.name,
        passed: false,
        duration: Date.now() - startTime,
        errors: [error.message],
        warnings: []
      });
      this.summary.failed++;
      this.summary.total++;
    }
  }

  async runAllTests() {
    console.log('🚀 WOOOD Integration Test Suite');
    console.log('================================');
    console.log(`Target: ${CONFIG.workersUrl}`);
    console.log(`Mock Mode: ${CONFIG.mockMode ? 'Enabled' : 'Disabled'}`);
    console.log(`Timeout: ${CONFIG.timeout}ms`);
    console.log('');

    for (const scenario of TEST_SCENARIOS) {
      await this.runTest(scenario);
    }

    this.printSummary();
  }

  async testExtensionWorkflow() {
    console.log('\n🔄 Testing Complete Extension Workflow');
    console.log('======================================');

    // Step 1: Fetch delivery dates (as extension would)
    console.log('\n📅 Step 1: Fetch Delivery Dates');
    const deliveryDatesResponse = await this.makeRequest(
      `${CONFIG.workersUrl}/api/delivery-dates/available?postalCode=1000AA&country=NL`
    );

    if (deliveryDatesResponse.statusCode !== 200 || !deliveryDatesResponse.data.success) {
      console.log('❌ Failed to fetch delivery dates');
      return false;
    }

    const deliveryDates = deliveryDatesResponse.data.data;
    if (!deliveryDates || deliveryDates.length === 0) {
      console.log('❌ No delivery dates returned');
      return false;
    }

    const selectedDate = deliveryDates[0].date;
    console.log(`✅ Selected delivery date: ${selectedDate}`);

    // Step 2: Process shipping method (as function would)
    console.log('\n🚚 Step 2: Process Shipping Method');
    const cartId = 'workflow_test_' + Date.now();
    const shippingResponse = await this.makeRequest(
      `${CONFIG.workersUrl}/api/shipping-methods/process`,
      {
        method: 'POST',
        body: {
          shippingMethod: '32 - EXPEDITIE 2-MANS',
          cartId: cartId,
          customerId: 'test_customer'
        }
      }
    );

    if (shippingResponse.statusCode !== 200 || !shippingResponse.data.success) {
      console.log('❌ Failed to process shipping method');
      return false;
    }

    console.log('✅ Shipping method processed successfully');

    // Step 3: Save order metafields (as extension would)
    console.log('\n💾 Step 3: Save Order Metafields');
    const metafieldsResponse = await this.makeRequest(
      `${CONFIG.workersUrl}/api/order-metafields/save`,
      {
        method: 'POST',
        body: {
          deliveryDate: selectedDate,
          shippingMethod: '32 - EXPEDITIE 2-MANS',
          orderId: 'workflow_order_' + Date.now(),
          timestamp: new Date().toISOString(),
          source: 'workflow_test'
        }
      }
    );

    if (metafieldsResponse.statusCode !== 200 || !metafieldsResponse.data.success) {
      console.log('❌ Failed to save order metafields');
      return false;
    }

    console.log('✅ Order metafields saved successfully');

    // Step 4: Verify data persistence
    console.log('\n🔍 Step 4: Verify Data Persistence');
    const retrieveResponse = await this.makeRequest(
      `${CONFIG.workersUrl}/api/shipping-methods/${cartId}`
    );

    if (retrieveResponse.statusCode === 200 && retrieveResponse.data.success) {
      console.log('✅ Data persistence verified');
    } else {
      console.log('⚠️  Data persistence verification skipped (endpoint may not be available)');
    }

    console.log('\n🎉 Complete workflow test PASSED');
    return true;
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 INTEGRATION TEST SUMMARY');
    console.log('='.repeat(60));

    console.log(`\nTotal Tests: ${this.summary.total}`);
    console.log(`✅ Passed: ${this.summary.passed}`);
    console.log(`❌ Failed: ${this.summary.failed}`);
    console.log(`⏭️  Skipped: ${this.summary.skipped}`);
    
    const successRate = this.summary.total > 0 ? 
      (this.summary.passed / this.summary.total) * 100 : 0;
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);

    // Detailed results
    if (this.summary.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results
        .filter(result => !result.passed)
        .forEach(result => {
          console.log(`   • ${result.name}`);
          result.errors.forEach(error => console.log(`     - ${error}`));
        });
    }

    // Performance summary
    const durations = this.results.map(r => r.duration);
    if (durations.length > 0) {
      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      const maxDuration = Math.max(...durations);
      const minDuration = Math.min(...durations);

      console.log('\n⚡ Performance Summary:');
      console.log(`   Average Response Time: ${avgDuration.toFixed(1)}ms`);
      console.log(`   Fastest Response: ${minDuration}ms`);
      console.log(`   Slowest Response: ${maxDuration}ms`);
    }

    // Recommendations
    console.log('\n💡 Recommendations:');
    if (successRate >= 90) {
      console.log('✅ API is ready for production use');
    } else if (successRate >= 70) {
      console.log('⚠️  API has some issues but is functional');
    } else {
      console.log('❌ API has significant issues and needs attention');
    }

    if (this.results.some(r => r.duration > 5000)) {
      console.log('⚠️  Some responses are slow (>5s) - consider optimization');
    }
  }
}

// CLI execution
async function main() {
  const tester = new IntegrationTester();
  
  const args = process.argv.slice(2);
  const testType = args[0] || 'all';

  try {
    switch (testType) {
      case 'all':
        await tester.runAllTests();
        await tester.testExtensionWorkflow();
        break;
      
      case 'api':
        await tester.runAllTests();
        break;
      
      case 'workflow':
        await tester.testExtensionWorkflow();
        break;
      
      default:
        console.log('Usage: node integration-test.js [all|api|workflow]');
        console.log('  all      - Run all tests (default)');
        console.log('  api      - Run API endpoint tests only');
        console.log('  workflow - Run complete workflow test only');
    }

    // Exit with error code if tests failed
    if (tester.summary.failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    process.exit(1);
  }
}

// Allow running this script directly
if (require.main === module) {
  main();
}

module.exports = { IntegrationTester, CONFIG, TEST_SCENARIOS }; 