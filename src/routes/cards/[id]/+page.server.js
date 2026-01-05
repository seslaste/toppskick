import { error, fail, redirect } from '@sveltejs/kit';
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
		notes: doc.notes ?? ''
	};
}

export async function load({ params, locals }) {
	const user = requireUser(locals);
	if (!ObjectId.isValid(params.id)) {
		throw error(404, 'Card not found');
	}

	const collection = await getCardsCollection();
	const card = await collection.findOne({ _id: new ObjectId(params.id), userId: user });

	if (!card) {
		throw error(404, 'Card not found');
	}

	return { card: mapCard(card) };
}

export const actions = {
	save: async ({ request, params, locals }) => {
		const user = requireUser(locals);
		if (!ObjectId.isValid(params.id)) {
			return fail(400, { error: 'Invalid card id.' });
		}

		const data = await request.formData();

		const collection = await getCardsCollection();
		await collection.updateOne(
			{ _id: new ObjectId(params.id), userId: user },
			{
				$set: {
					player: String(data.get('player') || '').trim(),
					team: String(data.get('team') || '').trim(),
					position: String(data.get('position') || '').trim(),
					nationality: String(data.get('nationality') || '').trim(),
					rarity: String(data.get('rarity') || '').trim(),
					forTrade: data.get('forTrade') === 'on',
					notes: String(data.get('notes') || '').trim(),
					updatedAt: new Date()
				}
			}
		);

		throw redirect(303, '/sammlung?updated=1');
	},
	delete: async ({ params, locals }) => {
		const user = requireUser(locals);
		if (!ObjectId.isValid(params.id)) {
			return fail(400, { error: 'Invalid card id.' });
		}

		const collection = await getCardsCollection();
		await collection.deleteOne({ _id: new ObjectId(params.id), userId: user });
		throw redirect(303, '/sammlung?deleted=1');
	}
};
