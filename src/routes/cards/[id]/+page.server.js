import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getCardsCollection } from '$lib/server/mongo';

function mapCard(doc) {
	return {
		id: doc._id.toString(),
		player: doc.player ?? '',
		team: doc.team ?? '',
		rarity: doc.rarity ?? '',
		forTrade: doc.forTrade ?? false,
		notes: doc.notes ?? ''
	};
}

export async function load({ params }) {
	if (!ObjectId.isValid(params.id)) {
		throw error(404, 'Card not found');
	}

	const collection = await getCardsCollection();
	const card = await collection.findOne({ _id: new ObjectId(params.id) });

	if (!card) {
		throw error(404, 'Card not found');
	}

	return { card: mapCard(card) };
}

export const actions = {
	default: async ({ request, params }) => {
		if (!ObjectId.isValid(params.id)) {
			return fail(400, { error: 'Invalid card id.' });
		}

		const data = await request.formData();

		const collection = await getCardsCollection();
		await collection.updateOne(
			{ _id: new ObjectId(params.id) },
			{
				$set: {
					player: String(data.get('player') || '').trim(),
					team: String(data.get('team') || '').trim(),
					rarity: String(data.get('rarity') || '').trim(),
					forTrade: data.get('forTrade') === 'on',
					notes: String(data.get('notes') || '').trim(),
					updatedAt: new Date()
				}
			}
		);

		throw redirect(303, '/');
	}
};
