import expressCors from 'cors';

const SEPARATOR = ' ';
const whitelist = process.env.WHITELISTED_URLS;

export function cors() {
	const options = {
		origin: whitelist,
	};
	return expressCors(options);
}

export function headers() {
	return function (req, res, next) {
		// Implement headers based authentication
		next();
	}
}