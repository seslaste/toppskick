import { fail, redirect } from '@sveltejs/kit';
import { getCardsCollection } from '$lib/server/mongo';

function buildPayload(data) {
	return {
		payload: {
			player: String(data.get('player') || '').trim(),
			team: String(data.get('team') || '').trim(),
			rarity: String(data.get('rarity') || '').trim(),
			forTrade: data.get('forTrade') === 'on',
			notes: String(data.get('notes') || '').trim(),
			createdAt: new Date(),
			updatedAt: new Date()
		}
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const { payload } = buildPayload(data);

		const collection = await getCardsCollection();
		await collection.insertOne(payload);
		throw redirect(303, '/');
	}
};
