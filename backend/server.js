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
import cartRoutes from './routes/cartRoutes.js'; // Import Cart routes
import wishlistRoutes from './routes/wishlistRoutes.js'; // Import wishlist routes
import { notFound, errorHandler } from './middlewear/errorMiddlewear.js';

import { GoogleGenerativeAI } from "@google/generative-ai"; // for Gemini
import groqRoutes from './routes/groqRoutes.js'; // Import the route
import addressRoutes from './routes/addressRoutes.js';


dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes); // Use Cart routes
app.use("/api/wishlist", wishlistRoutes); // Use wishlist routes

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.use("/api/groq", groqRoutes); 
app.use('/api/addresses', addressRoutes);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
      const result = await model.generateContent(prompt);
      res.json({ response: result.response.text() });
  } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ error: "Error generating content" });
  }
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
