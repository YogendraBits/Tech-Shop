import { MongoClient } from 'mongodb';

async function deleteItemsFromCollection(collectionName, filter) {
    // Replace with your MongoDB Atlas connection string
    const uri = "mongodb+srv://2023sl93020:admin@cluster0.k9wykal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Specify the database name
        const dbName = 'test';

        // Access the specified collection
        const collection = client.db(dbName).collection(collectionName);

        // Delete documents matching the filter
        const result = await collection.deleteMany(filter);

        console.log(`Deleted ${result.deletedCount} document(s) from the collection "${collectionName}".`);
    } catch (error) {
        console.error('Error deleting items:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Call the function with the desired collection name and filter for deletion
deleteItemsFromCollection('logs'); // Change the filter as needed
