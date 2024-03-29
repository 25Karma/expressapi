import expressRatelimit from 'express-rate-limit';

export function ratelimit(requestsPerMinute) {
	const options = {
		windowMs: 60 * 1000,
		max: requestsPerMinute,
		message: {success: false, reason: 'RATELIMITED'},
		standardHeaders: true,
		legacyHeaders: false,
	};
	return expressRatelimit(options);
}