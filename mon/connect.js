import { MongoClient } from 'mongodb';

async function listDatabasesAndCollections() {
    // Replace with your MongoDB Atlas connection string
    const uri = "mongodb+srv://2023sl93020:admin@cluster0.k9wykal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Specify the database name
        const dbName = 'test';
        
        // List collections in the specified database
        const collections = await client.db(dbName).collections();
        
        for (const collection of collections) {
            // Fetch a sample document to infer schema
            const sampleDocument = await collection.findOne();

            if (sampleDocument) {
                // Display fields in the sample document
                for (const [key, value] of Object.entries(sampleDocument)) {
                }
            } else {
                console.log('   No documents found.');
            }
        }
    } catch (error) {
        console.error('Error retrieving collections or schema:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

listDatabasesAndCollections();
