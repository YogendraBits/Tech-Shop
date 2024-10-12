// /backend/monitoring/winstonLogger.js
import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import 'winston-mongodb'; // Import the winston-mongodb package
import dotenv from 'dotenv';
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    new winston.transports.File({ filename: path.join(logDir, 'errors.log'), level: 'error' }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI, // Your MongoDB URI
      level: 'info',
      collection: 'logs', // The name of your MongoDB collection
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Save logs as JSON
      ),
    }),
  ],
});

// Export the logger
export default logger;
