import memjs from 'memjs';

export function memjsClient(key) {
	const sanitizedKey = sanitizeString(key);
	const cachePrefix = sanitizedKey.charAt(0).toUpperCase();
	const cacheCredentials = {
		server: process.env[`${cachePrefix}_CACHE_SERVERS`],
		username: process.env[`${cachePrefix}_CACHE_USERNAME`],
		password: process.env[`${cachePrefix}_CACHE_PASSWORD`],
	};

	// If the caching server credentials are missing from the environment variables, return an inactive client
	if (Object.values(cacheCredentials).some(credential => credential === '')) {
		return getInactiveClient();
	} else {
		return getActiveClient(memjs.Client.create(
			cacheCredentials.server,
			{
				username: cacheCredentials.username,
				password: cacheCredentials.password,
			}
		), sanitizedKey);
	}
}

function getActiveClient(client, key) {
	return {
		get: async () => {
			const value = (await client.get(key)).value;
			if (value === null) {
				return null;
			}
			else {
				return JSON.parse(value.toString());
			}
		},
		set: async (val) => {
			client.set(
				key, 
				Buffer.from(JSON.stringify(val)), 
				{expires: 30*24*60*60}); // If this changes, update the Tip.js file in 25Karma
		},
		close: () => {
			client.close();
		},
	};
}

function getInactiveClient() {
	return {
		get: async () => null,
		set: async () => {},
		close: () => {},
	}
}

function sanitizeString(id) {
	return id.split('-').join('').toLowerCase();
}