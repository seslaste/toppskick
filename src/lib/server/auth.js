import { redirect } from '@sveltejs/kit';

export function requireUser(locals) {
	const user = locals.user;
	if (!user) {
		throw redirect(303, '/login');
	}
	return user;
}
