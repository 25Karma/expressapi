import expressRatelimit from 'express-rate-limit';

export function ratelimit(req, res, next) {
	const options = {
		windowMs: 60 * 1000,
		max: 12,
		message: {success: false, reason: 'RATELIMITED'},
	};
	return expressRatelimit(options);
}