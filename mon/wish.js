import { MongoClient } from 'mongodb';

async function fetchAllItemsFromCollection(collectionName) {
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

        // Fetch all documents in the collection
        const items = await collection.find().toArray();

        console.log(`Items in the collection "${collectionName}":`);
        
        if (items.length > 0) {
            items.forEach((item, index) => {
                console.log(` - Item ${index + 1}:`, item);
            });
        } else {
            console.log('   No documents found in the collection.');
        }
    } catch (error) {
        console.error('Error retrieving items:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Call the function with the desired collection name
fetchAllItemsFromCollection('users'); // Change 'wishlistitems' to your desired collection name
