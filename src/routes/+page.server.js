import { fail } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getCardsCollection } from '$lib/server/mongo';
import { requireUser } from '$lib/server/auth';

function mapCard(doc) {
	return {
		id: doc._id.toString(),
		player: doc.player ?? '',
		team: doc.team ?? '',
		position: doc.position ?? '',
		nationality: doc.nationality ?? '',
		rarity: doc.rarity ?? '',
		forTrade: doc.forTrade ?? false,
		notes: doc.notes ?? '',
		createdAt: doc.createdAt ? doc.createdAt.toISOString() : ''
	};
}

export async function load({ locals }) {
	const user = requireUser(locals);
	const collection = await getCardsCollection();
	const docs = await collection.find({ userId: user }).sort({ createdAt: -1 }).toArray();
	return {
		cards: docs.map(mapCard)
	};
}

export const actions = {
	delete: async ({ request, locals }) => {
		const user = requireUser(locals);
		const data = await request.formData();
		const id = data.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400, { error: 'Missing card id.' });
		}
		if (!ObjectId.isValid(id)) {
			return fail(400, { error: 'Invalid card id.' });
		}

		const collection = await getCardsCollection();
		await collection.deleteOne({ _id: new ObjectId(id), userId: user });
		return { success: true };
	}
};
