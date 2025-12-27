import { fail, redirect } from '@sveltejs/kit';
import { getCardsCollection } from '$lib/server/mongo';

function buildPayload(data) {
	const player = String(data.get('player') || '').trim();
	const team = String(data.get('team') || '').trim();
	const position = String(data.get('position') || '').trim();
	const nationality = String(data.get('nationality') || '').trim();
	const rarity = String(data.get('rarity') || '').trim();

	if (!player) {
		return { error: 'Spieler ist erforderlich.' };
	}
	if (!team) {
		return { error: 'Team ist erforderlich.' };
	}
	if (!position) {
		return { error: 'Position ist erforderlich.' };
	}
	if (!nationality) {
		return { error: 'Nationalitaet ist erforderlich.' };
	}
	if (!rarity) {
		return { error: 'Rarity ist erforderlich.' };
	}

	return {
		payload: {
			player,
			team,
			position,
			nationality,
			rarity,
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
		const { payload, error } = buildPayload(data);

		if (error) {
			return fail(400, { error });
		}

		const collection = await getCardsCollection();
		await collection.insertOne(payload);
		throw redirect(303, '/');
	}
};
