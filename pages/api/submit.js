import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const client = await clientPromise;
            const db = client.db(process.env.NEXT_ATLAS_DATABASE);
            const collection = db.collection(process.env.NEXT_ATLAS_COLLECTION);
            const result = await collection.insertOne(req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}