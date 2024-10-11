// Middleware for handling 404 errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set the status to 404
  next(error); // Pass the error to the next middleware
};

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 for unexpected errors
  res.status(statusCode).json({
      message: err.message, // Send the error message
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Send stack trace only in development
  });
};

export { notFound, errorHandler };