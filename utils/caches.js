import memjs from 'memjs';

export function memjsClient(key) {
	const sanitizedKey = sanitizeString(key);
	const cachePrefix = sanitizedKey.charAt(0).toUpperCase();
	const client = memjs.Client.create(
		process.env[`${cachePrefix}_CACHE_SERVERS`],
		{
			username: process.env[`${cachePrefix}_CACHE_USERNAME`],
			password: process.env[`${cachePrefix}_CACHE_PASSWORD`],
		}
	);
	return {
		get: async () => {
			const value = (await client.get(sanitizedKey)).value;
			if (value === null) {
				return null
			}
			else {
				return JSON.parse(value.toString());
			}
		},
		set: async (val) => {
			client.set(
				sanitizedKey, 
				Buffer.from(JSON.stringify(val)), 
				{expires: 30*24*60*60}); // If this changes, update the Tip.js file in 25Karma
		},
		close: () => {
			client.close();
		},
	}
}

function sanitizeString(id) {
	return id.split('-').join('').toLowerCase();
}