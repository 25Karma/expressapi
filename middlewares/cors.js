import expressCors from 'cors';

const whitelist = process.env.FRONTEND_URLS.split(' ')

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