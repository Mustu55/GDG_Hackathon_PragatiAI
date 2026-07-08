const app = require('../backend/src/app');
const connectDB = require('../backend/src/config/db');

// Connect to Database
connectDB();

module.exports = app;
