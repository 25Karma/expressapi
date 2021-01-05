import { cacheClient } from '../utils/caches';
import * as filters from '../utils/filters';
import * as requests from '../utils/requests';

export default async function(req, res) {
	const client = cacheClient('NAME');
	const slug = req.params.slug;
	let successfulJson = {success: true, slug};
	let failedJson = {success: false, slug};
	
	// Get the slug from the cache
	const cachedValue = await client.get(slug);
	if (cachedValue !== null) {
		successfulJson.mojang = filters.filterMojang(cachedValue);
	}

	// If slug is not found in cache, call the Mojang API
	else {
		const mojangResponse = await requests.getMojang(slug);
		if (mojangResponse.ok) {
			successfulJson.mojang = filters.filterMojang(await mojangResponse.json());
		}
		else if (mojangResponse.status === 400) {
			failedJson.reason = 'MOJANG_CALL_FAILED';
			return res.send(failedJson);
		}
		else if (mojangResponse.status === 404) {
			failedJson.reason = 'MOJANG_PLAYER_DNE';
			return res.send(failedJson);
		}	
		else {
			failedJson.reason = 'UNKNOWN';
			return res.send(failedJson);
		}
	}

	const guildResponse = await requests.getHypixelGuild(successfulJson.mojang.uuid);
	successfulJson.guild = (await guildResponse.json()).guild;
	const rateLimitRemaining = guildResponse.headers.get('ratelimit-remaining');
	const rateLimitBuffer = 30;

	if (!successfulJson.guild) {
		failedJson.reason = 'HYPIXEL_GUILD_DNE';
		return res.send(failedJson);
	}

	client.close();

	return res.json(successfulJson);
}