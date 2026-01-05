import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = env.MONGODB_URI;
const dbName = env.DB_NAME || 'toppskick';

if (!uri) {
	throw new Error('Missing MONGODB_URI in environment.');
}

if (!globalThis.__mongoClientPromise) {
	const client = new MongoClient(uri);
	globalThis.__mongoClientPromise = client.connect();
}

const clientPromise = globalThis.__mongoClientPromise;

export async function getCardsCollection() {
	const client = await clientPromise;
	return client.db(dbName).collection('cards');
}

export async function getUsersCollection() {
	const client = await clientPromise;
	return client.db(dbName).collection('users');
}
