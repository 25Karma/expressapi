import memjs from 'memjs';

export function cacheClient(name) {
	const client = memjs.Client.create(
		process.env[`${name}_CACHE_SERVERS`],
		{
			username: process.env[`${name}_CACHE_USERNAME`],
			password: process.env[`${name}_CACHE_PASSWORD`],
		}
	);
	return {
		get: async (key) => {
			const value = (await client.get(key.toLowerCase())).value;
			if (value === null) {
				return null
			}
			else {
				return JSON.parse(value.toString());
			}
		},
		set: async (key, val) => {
			client.set(
				key.toLowerCase(), 
				Buffer.from(JSON.stringify(val)), 
				{expires: 24*60*60});
		}
	}
}