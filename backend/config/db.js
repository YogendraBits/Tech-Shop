import mongoose from "mongoose";

// DB Connection
const connectDB = async () => {
    try {

        mongoose.set('strictQuery', false);     // Allows fields in the query that are not defined in the schema
        
        // Check if MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1); // Exit the process with failure
    }
};

// Connection Event Handlers
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB'.green.inverse);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB'.yellow.inverse);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`.red.inverse);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination'.blue.inverse);
    process.exit(0);
});

export default connectDB;
