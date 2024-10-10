import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_ATLAS_URI;
const client = new MongoClient(uri);

async function testConnection() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        await client.close();
    }
}

testConnection();