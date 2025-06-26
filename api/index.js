// Vercel serverless function entry point
const path = require('path');

// Import our built Express app (ES6 default export)
const { default: app } = require('../backend/dist/server.js');

// Export for Vercel
module.exports = app; 