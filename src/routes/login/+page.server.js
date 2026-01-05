import { fail, redirect } from '@sveltejs/kit';
import { getUsersCollection } from '$lib/server/mongo';
import { verifyPassword } from '$lib/server/password';

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(303, '/');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = String(data.get('username') || '').trim();
		const password = String(data.get('password') || '').trim();

		if (!username) {
			return fail(400, { error: 'Bitte einen Benutzernamen eingeben.' });
		}
		if (!password) {
			return fail(400, { error: 'Bitte ein Passwort eingeben.' });
		}

		const users = await getUsersCollection();
		const user = await users.findOne({ username });
		if (!user || !verifyPassword(password, user.passwordHash)) {
			return fail(400, { error: 'Benutzername oder Passwort ist falsch.' });
		}

		cookies.set('demo_user', username, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(303, '/');
	}
};
