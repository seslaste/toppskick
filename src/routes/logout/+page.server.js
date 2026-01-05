import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('demo_user', { path: '/' });
		throw redirect(303, '/login');
	}
};
