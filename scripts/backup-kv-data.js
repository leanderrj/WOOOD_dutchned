#!/usr/bin/env node

/**
 * WOOOD Delivery API - KV Data Backup Script
 * Backs up KV store data for disaster recovery
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const WORKER_ENV = process.env.WORKER_ENV || 'development';
const BACKUP_DIR = path.join(process.cwd(), 'backups', 'kv');

console.log(`💾 WOOOD Delivery API KV Backup - ${WORKER_ENV.toUpperCase()}`);

// Ensure backup directory exists
function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
  }
}

// Generate timestamp for backup file
function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_');
}

// Backup KV data
function backupKVData() {
  const timestamp = getTimestamp();
  const backupFile = path.join(BACKUP_DIR, `kv-backup-${WORKER_ENV}-${timestamp}.json`);
  
  try {
    console.log('🔄 Fetching KV keys...');
    
    // Get all keys from the KV namespace
    const envFlag = WORKER_ENV !== 'development' ? `--env ${WORKER_ENV}` : '';
    const keysCommand = `cd workers && wrangler kv:key list --binding=DELIVERY_CACHE ${envFlag}`;
    
    const keysOutput = execSync(keysCommand, { encoding: 'utf8' });
    const keys = JSON.parse(keysOutput);
    
    console.log(`📋 Found ${keys.length} keys`);
    
    const backupData = {
      timestamp: new Date().toISOString(),
      environment: WORKER_ENV,
      keys: keys,
      data: {}
    };
    
    // Backup each key's data
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      process.stdout.write(`💾 Backing up key ${i + 1}/${keys.length}: ${key.name}... `);
      
      try {
        const getCommand = `cd workers && wrangler kv:key get --binding=DELIVERY_CACHE "${key.name}" ${envFlag}`;
        const value = execSync(getCommand, { encoding: 'utf8' });
        
        backupData.data[key.name] = {
          value: value,
          metadata: key.metadata || null
        };
        
        console.log('✅');
      } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        backupData.data[key.name] = {
          error: error.message,
          metadata: key.metadata || null
        };
      }
    }
    
    // Save backup file
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    
    console.log(`\n✅ Backup completed successfully!`);
    console.log(`📁 Backup file: ${backupFile}`);
    console.log(`📊 Backed up ${Object.keys(backupData.data).length} keys`);
    
    return backupFile;
    
  } catch (error) {
    console.error(`❌ Backup failed: ${error.message}`);
    return null;
  }
}

// Cleanup old backups (keep last 10)
function cleanupOldBackups() {
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith(`kv-backup-${WORKER_ENV}-`) && file.endsWith('.json'))
      .map(file => ({
        name: file,
        path: path.join(BACKUP_DIR, file),
        stats: fs.statSync(path.join(BACKUP_DIR, file))
      }))
      .sort((a, b) => b.stats.mtime.getTime() - a.stats.mtime.getTime());
    
    if (files.length > 10) {
      const filesToDelete = files.slice(10);
      console.log(`🧹 Cleaning up ${filesToDelete.length} old backup files...`);
      
      filesToDelete.forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`🗑️  Deleted: ${file.name}`);
      });
    }
  } catch (error) {
    console.warn(`⚠️  Cleanup warning: ${error.message}`);
  }
}

// Main execution
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
WOOOD Delivery API - KV Data Backup Script

This script backs up all data from the Workers KV namespace for disaster recovery.

Usage:
  node backup-kv-data.js [options]

Environment Variables:
  WORKER_ENV   Target environment (development|staging|production)

Options:
  --help, -h   Show this help message

Examples:
  # Backup development environment
  node backup-kv-data.js

  # Backup staging environment
  WORKER_ENV=staging node backup-kv-data.js

  # Backup production environment
  WORKER_ENV=production node backup-kv-data.js

Backup files are saved to: ./backups/kv/
Old backups are automatically cleaned up (keeps last 10).
`);
  process.exit(0);
}

console.log('🚀 Starting KV data backup...\n');

ensureBackupDir();
const backupFile = backupKVData();

if (backupFile) {
  cleanupOldBackups();
  console.log('\n🎉 Backup process completed successfully!');
} else {
  console.log('\n❌ Backup process failed!');
  process.exit(1);
} 