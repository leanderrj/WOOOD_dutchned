#!/usr/bin/env node

/**
 * Performance Testing Script for Workers vs Traditional Backend
 * Tests response times, throughput, and reliability across different endpoints
 */

import * as https from 'https';
import { performance } from 'perf_hooks';

// Type definitions
interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

interface TestEndpoint {
  path: string;
  method: string;
  name: string;
  body?: any;
}

interface TestResult {
  success: boolean;
  responseTime: number;
  statusCode?: number;
  size?: number;
  cached?: boolean;
  error?: string;
}

// Test configuration
const TEST_CONFIG = {
  workers: {
    baseUrl: process.env.WORKERS_URL || 'https://woood-delivery-api.workers.dev',
    name: 'Cloudflare Workers'
  },
  vercel: {
    baseUrl: process.env.VERCEL_URL || 'https://woood-dutchned.vercel.app',
    name: 'Vercel Backend'
  },
  concurrency: parseInt(process.env.CONCURRENCY || '10') || 10,
  iterations: parseInt(process.env.ITERATIONS || '50') || 50,
  timeout: parseInt(process.env.TIMEOUT || '30000') || 30000
};

// Test endpoints
const ENDPOINTS = [
  {
    path: '/health',
    method: 'GET',
    name: 'Health Check'
  },
  {
    path: '/api/delivery-dates/available',
    method: 'GET',
    name: 'Delivery Dates API'
  },
  {
    path: '/api/delivery-dates/available?postalCode=1000AA&country=NL',
    method: 'GET',
    name: 'Delivery Dates with Parameters'
  },
  {
    path: '/api/shipping-methods/process',
    method: 'POST',
    name: 'Shipping Methods Processing',
    body: {
      shippingMethod: '32 - EXPEDITIE 2-MANS',
      cartId: 'test_cart_123',
      customerId: 'test_customer_456'
    }
  }
];

// Regional test locations (simulated via different CDN edges)
const REGIONS = [
  { name: 'Europe (Amsterdam)', code: 'AMS' },
  { name: 'North America (New York)', code: 'NYC' },
  { name: 'Asia Pacific (Singapore)', code: 'SIN' }
];

class PerformanceTester {
  constructor() {
    this.results = {
      workers: {},
      vercel: {}
    };
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      
      const requestOptions = {
        method: options.method || 'GET',
        timeout: TEST_CONFIG.timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WOOOD-Performance-Test/1.0',
          'Accept': 'application/json',
          ...options.headers
        }
      };

      const req = https.request(url, requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const endTime = performance.now();
          resolve({
            statusCode: res.statusCode,
            responseTime: endTime - startTime,
            size: Buffer.byteLength(data, 'utf8'),
            data: data,
            headers: res.headers
          });
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

  async runSingleTest(baseUrl, endpoint) {
    const url = `${baseUrl}${endpoint.path}`;
    const options = {
      method: endpoint.method,
      body: endpoint.body
    };

    try {
      const result = await this.makeRequest(url, options);
      return {
        success: true,
        responseTime: result.responseTime,
        statusCode: result.statusCode,
        size: result.size,
        cached: result.headers['x-cache-status'] === 'HIT'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        responseTime: TEST_CONFIG.timeout
      };
    }
  }

  async runConcurrentTests(baseUrl, endpoint, concurrency, iterations) {
    const results = [];
    const batches = Math.ceil(iterations / concurrency);

    for (let batch = 0; batch < batches; batch++) {
      const batchPromises = [];
      const batchSize = Math.min(concurrency, iterations - batch * concurrency);

      for (let i = 0; i < batchSize; i++) {
        batchPromises.push(this.runSingleTest(baseUrl, endpoint));
      }

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Small delay between batches to avoid overwhelming the server
      if (batch < batches - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return results;
  }

  calculateStats(results) {
    const successful = results.filter(r => r.success);
    const responseTimes = successful.map(r => r.responseTime);
    const sizes = successful.map(r => r.size || 0);
    const cached = successful.filter(r => r.cached).length;

    if (responseTimes.length === 0) {
      return {
        count: results.length,
        successRate: 0,
        avgResponseTime: 0,
        medianResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        minResponseTime: 0,
        maxResponseTime: 0,
        avgSize: 0,
        cacheHitRate: 0,
        errors: results.filter(r => !r.success).length
      };
    }

    responseTimes.sort((a, b) => a - b);
    
    return {
      count: results.length,
      successRate: (successful.length / results.length) * 100,
      avgResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
      medianResponseTime: responseTimes[Math.floor(responseTimes.length / 2)],
      p95ResponseTime: responseTimes[Math.floor(responseTimes.length * 0.95)],
      p99ResponseTime: responseTimes[Math.floor(responseTimes.length * 0.99)],
      minResponseTime: responseTimes[0],
      maxResponseTime: responseTimes[responseTimes.length - 1],
      avgSize: sizes.reduce((a, b) => a + b, 0) / sizes.length,
      cacheHitRate: successful.length > 0 ? (cached / successful.length) * 100 : 0,
      errors: results.filter(r => !r.success).length
    };
  }

  formatStats(stats) {
    return {
      'Success Rate': `${stats.successRate.toFixed(1)}%`,
      'Average Response Time': `${stats.avgResponseTime.toFixed(1)}ms`,
      'Median Response Time': `${stats.medianResponseTime.toFixed(1)}ms`,
      'P95 Response Time': `${stats.p95ResponseTime.toFixed(1)}ms`,
      'P99 Response Time': `${stats.p99ResponseTime.toFixed(1)}ms`,
      'Min Response Time': `${stats.minResponseTime.toFixed(1)}ms`,
      'Max Response Time': `${stats.maxResponseTime.toFixed(1)}ms`,
      'Average Response Size': `${(stats.avgSize / 1024).toFixed(2)}KB`,
      'Cache Hit Rate': `${stats.cacheHitRate.toFixed(1)}%`,
      'Error Count': stats.errors
    };
  }

  async runComparison() {
    console.log('🚀 WOOOD Delivery API Performance Comparison');
    console.log('==========================================');
    console.log(`Concurrency: ${TEST_CONFIG.concurrency}`);
    console.log(`Iterations: ${TEST_CONFIG.iterations}`);
    console.log(`Timeout: ${TEST_CONFIG.timeout}ms`);
    console.log('');

    for (const endpoint of ENDPOINTS) {
      console.log(`\n📊 Testing: ${endpoint.name}`);
      console.log('─'.repeat(50));

      // Test Workers
      console.log(`\n⚡ ${TEST_CONFIG.workers.name} - ${TEST_CONFIG.workers.baseUrl}`);
      const workersResults = await this.runConcurrentTests(
        TEST_CONFIG.workers.baseUrl,
        endpoint,
        TEST_CONFIG.concurrency,
        TEST_CONFIG.iterations
      );
      const workersStats = this.calculateStats(workersResults);
      console.table(this.formatStats(workersStats));

      // Test Vercel
      console.log(`\n🌐 ${TEST_CONFIG.vercel.name} - ${TEST_CONFIG.vercel.baseUrl}`);
      const vercelResults = await this.runConcurrentTests(
        TEST_CONFIG.vercel.baseUrl,
        endpoint,
        TEST_CONFIG.concurrency,
        TEST_CONFIG.iterations
      );
      const vercelStats = this.calculateStats(vercelResults);
      console.table(this.formatStats(vercelStats));

      // Comparison
      console.log('\n📈 Performance Comparison:');
      const comparison = {
        'Metric': 'Workers vs Vercel',
        'Response Time Improvement': workersStats.avgResponseTime < vercelStats.avgResponseTime 
          ? `${((vercelStats.avgResponseTime - workersStats.avgResponseTime) / vercelStats.avgResponseTime * 100).toFixed(1)}% faster`
          : `${((workersStats.avgResponseTime - vercelStats.avgResponseTime) / workersStats.avgResponseTime * 100).toFixed(1)}% slower`,
        'P95 Improvement': workersStats.p95ResponseTime < vercelStats.p95ResponseTime
          ? `${((vercelStats.p95ResponseTime - workersStats.p95ResponseTime) / vercelStats.p95ResponseTime * 100).toFixed(1)}% faster`
          : `${((workersStats.p95ResponseTime - vercelStats.p95ResponseTime) / workersStats.p95ResponseTime * 100).toFixed(1)}% slower`,
        'Success Rate Diff': `${(workersStats.successRate - vercelStats.successRate).toFixed(1)}%`,
        'Cache Hit Rate Diff': `${(workersStats.cacheHitRate - vercelStats.cacheHitRate).toFixed(1)}%`
      };
      console.table(comparison);

      // Store results for final summary
      this.results.workers[endpoint.name] = workersStats;
      this.results.vercel[endpoint.name] = vercelStats;
    }

    this.printFinalSummary();
  }

  printFinalSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL PERFORMANCE SUMMARY');
    console.log('='.repeat(60));

    let workersWins = 0;
    let vercelWins = 0;

    for (const endpoint of ENDPOINTS) {
      const workersStats = this.results.workers[endpoint.name];
      const vercelStats = this.results.vercel[endpoint.name];

      if (workersStats.avgResponseTime < vercelStats.avgResponseTime) {
        workersWins++;
      } else {
        vercelWins++;
      }
    }

    console.log(`\n🏆 Overall Winner: ${workersWins > vercelWins ? 'Cloudflare Workers' : 'Vercel Backend'}`);
    console.log(`   Workers wins: ${workersWins}/${ENDPOINTS.length} endpoints`);
    console.log(`   Vercel wins: ${vercelWins}/${ENDPOINTS.length} endpoints`);

    // Calculate overall averages
    const overallWorkers = this.calculateOverallStats(this.results.workers);
    const overallVercel = this.calculateOverallStats(this.results.vercel);

    console.log('\n📊 Overall Performance Metrics:');
    const overallComparison = {
      'Metric': ['Workers', 'Vercel', 'Difference'],
      'Avg Response Time': [
        `${overallWorkers.avgResponseTime.toFixed(1)}ms`,
        `${overallVercel.avgResponseTime.toFixed(1)}ms`,
        `${((overallVercel.avgResponseTime - overallWorkers.avgResponseTime) / overallVercel.avgResponseTime * 100).toFixed(1)}%`
      ],
      'Success Rate': [
        `${overallWorkers.successRate.toFixed(1)}%`,
        `${overallVercel.successRate.toFixed(1)}%`,
        `${(overallWorkers.successRate - overallVercel.successRate).toFixed(1)}%`
      ],
      'Cache Hit Rate': [
        `${overallWorkers.cacheHitRate.toFixed(1)}%`,
        `${overallVercel.cacheHitRate.toFixed(1)}%`,
        `${(overallWorkers.cacheHitRate - overallVercel.cacheHitRate).toFixed(1)}%`
      ]
    };
    console.table(overallComparison);

    console.log('\n💡 Recommendations:');
    if (overallWorkers.avgResponseTime < overallVercel.avgResponseTime) {
      console.log('✅ Workers show better performance - proceed with migration');
    } else {
      console.log('⚠️  Vercel shows better performance - review Workers optimization');
    }

    if (overallWorkers.cacheHitRate > overallVercel.cacheHitRate) {
      console.log('✅ Workers caching is more effective');
    }

    if (overallWorkers.successRate < 95) {
      console.log('⚠️  Workers reliability needs improvement');
    }
  }

  calculateOverallStats(platformResults) {
    const allStats = Object.values(platformResults);
    return {
      avgResponseTime: allStats.reduce((sum, stats) => sum + stats.avgResponseTime, 0) / allStats.length,
      successRate: allStats.reduce((sum, stats) => sum + stats.successRate, 0) / allStats.length,
      cacheHitRate: allStats.reduce((sum, stats) => sum + stats.cacheHitRate, 0) / allStats.length
    };
  }

  async runLoadTest(baseUrl, endpoint, duration = 60000) {
    console.log(`\n🔥 Load Test: ${endpoint.name} for ${duration/1000}s`);
    console.log(`Target: ${baseUrl}${endpoint.path}`);
    
    const startTime = Date.now();
    const results = [];
    let requestCount = 0;

    while (Date.now() - startTime < duration) {
      const batchPromises = [];
      for (let i = 0; i < TEST_CONFIG.concurrency; i++) {
        batchPromises.push(this.runSingleTest(baseUrl, endpoint));
        requestCount++;
      }

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Brief pause to prevent overwhelming
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    const actualDuration = Date.now() - startTime;
    const stats = this.calculateStats(results);
    const throughput = (results.length / actualDuration) * 1000; // requests per second

    console.log('\n📊 Load Test Results:');
    console.table({
      'Duration': `${(actualDuration/1000).toFixed(1)}s`,
      'Total Requests': results.length,
      'Throughput': `${throughput.toFixed(1)} req/s`,
      'Success Rate': `${stats.successRate.toFixed(1)}%`,
      'Avg Response Time': `${stats.avgResponseTime.toFixed(1)}ms`,
      'P95 Response Time': `${stats.p95ResponseTime.toFixed(1)}ms`,
      'Error Count': stats.errors
    });

    return { stats, throughput, duration: actualDuration };
  }
}

// Main execution
async function main() {
  const tester = new PerformanceTester();
  
  const args = process.argv.slice(2);
  const testType = args[0] || 'comparison';

  try {
    switch (testType) {
      case 'comparison':
        await tester.runComparison();
        break;
      
      case 'load':
        const endpoint = ENDPOINTS[0]; // Health check for load test
        const duration = parseInt(args[1]) || 60000;
        console.log('🔥 Running Load Tests');
        
        console.log('\n⚡ Testing Workers:');
        await tester.runLoadTest(TEST_CONFIG.workers.baseUrl, endpoint, duration);
        
        console.log('\n🌐 Testing Vercel:');
        await tester.runLoadTest(TEST_CONFIG.vercel.baseUrl, endpoint, duration);
        break;
      
      default:
        console.log('Usage: node performance-test.js [comparison|load] [duration_ms]');
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Allow running this script directly
if (require.main === module) {
  main();
}

module.exports = { PerformanceTester, TEST_CONFIG, ENDPOINTS }; 