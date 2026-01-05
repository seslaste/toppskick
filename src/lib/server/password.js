import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';

const ITERATIONS = 100000;
const KEY_LENGTH = 32;
const DIGEST = 'sha256';

export function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
	return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
	const [salt, hash] = stored.split(':');
	if (!salt || !hash) {
		return false;
	}
	const derived = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
	const storedHash = Buffer.from(hash, 'hex');
	if (storedHash.length !== derived.length) {
		return false;
	}
	return timingSafeEqual(storedHash, derived);
}
