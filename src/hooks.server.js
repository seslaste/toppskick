export async function handle({ event, resolve }) {
	event.locals.user = event.cookies.get('demo_user') || null;
	return resolve(event);
}
