import { fail } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getCardsCollection } from '$lib/server/mongo';

function mapCard(doc) {
	return {
		id: doc._id.toString(),
		player: doc.player ?? '',
		team: doc.team ?? '',
		rarity: doc.rarity ?? '',
		forTrade: doc.forTrade ?? false,
		notes: doc.notes ?? '',
		createdAt: doc.createdAt ? doc.createdAt.toISOString() : ''
	};
}

export async function load() {
	const collection = await getCardsCollection();
	const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
	return {
		cards: docs.map(mapCard)
	};
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { error: 'Missing card id.' });
		}
		if (!ObjectId.isValid(id)) {
			return fail(400, { error: 'Invalid card id.' });
		}

		const collection = await getCardsCollection();
		await collection.deleteOne({ _id: new ObjectId(id) });
		return { success: true };
	}
};
