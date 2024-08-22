import expressCors from 'cors';

const whitelist = [];

export function cors() {
	const options = {
		origin: whitelist.length ? whitelist : '*',
	};
	return expressCors(options);
}

export function headers() {
	return function (req, res, next) {
		// Implement headers based authentication
		next();
	}
}