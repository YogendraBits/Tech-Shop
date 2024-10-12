// server.js
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productsRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import groqRoutes from './routes/groqRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import axios from 'axios';
import winstonLogger from './monitoring/winstonLogger.js';
import { trackRequest, metricsRoute } from './monitoring/metrics.js';
import logRoutes from './routes/logRoutes.js';


dotenv.config();
connectDB();
const app = express();

// Middleware for logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to parse JSON requests
app.use(express.json());

// Log HTTP requests with morgan and Winston
app.use(morgan('combined', {
  stream: { write: message => winstonLogger.info(message.trim()) }
}));

// API Routes
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/groq", groqRoutes);
app.use('/api/logs', logRoutes);

// PayPal Client ID endpoint
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Google Generative AI integration
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await model.generateContent(prompt);
    winstonLogger.info(`Chat response sent: ${result.response.text()}`); // Log successful response
    res.json({ response: result.response.text() });
  } catch (error) {
    winstonLogger.error(`Error generating content: ${error.message}`);
    res.status(500).json({ error: "Error generating content" });
  }
});

// Geocoding endpoint
app.get('/api/geocode', async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: {
        q: `${latitude}+${longitude}`,
        key: process.env.LOCATION_API,
      },
    });

    if (response.data.results.length > 0) {
      winstonLogger.info(`Geocode success for ${latitude}, ${longitude}`); // Log successful geocode
      res.json(response.data.results[0].components);
    } else {
      res.status(404).json({ message: 'No address found for the current location.' });
    }
  } catch (error) {
    winstonLogger.error(`Error fetching geocoding data: ${error.message}`);
    res.status(500).json({ message: 'Unable to retrieve address details.' });
  }
});

// Serve static files from the uploads directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Apply metrics middleware
app.use(trackRequest);

// Expose /metrics for Prometheus scraping
app.get('/metrics', metricsRoute);

// Production setup for serving frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Global error handler
app.use((err, req, res, next) => {
  winstonLogger.error(`${req.method} ${req.url} - ${err.message}`); // Log the error with Winston
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
