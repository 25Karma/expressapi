import { cacheClient } from '../utils/caches';
import * as filters from '../utils/filters';
import * as requests from '../utils/requests';

export default async function(req, res) {
	const client = cacheClient('NAME');
	const slug = req.params.slug;
	let successfulJson = {success: true, slug};
	let failedJson = {success: false};

	// Check cache
	const cachedValue = await client.get(slug);
	if (cachedValue !== null) {
		Object.assign(successfulJson, cachedValue);
	}
	// If not in cache
	else {
		// GET Mojang
		const mojangResponse = await requests.getMojang(slug);
		if (!mojangResponse.ok) {
			return res.send(failedJson);
		}
		const mojangJson = await mojangResponse.json();

		// GET Hypixel
		const uuid = mojangJson.uuid;
		const playerResponse = await requests.getHypixelPlayer(uuid);
		if (playerResponse.ok) {
			const playerJson = await playerResponse.json();
			if (playerJson.player === null) {
				failedJson.reason = 'HYPIXEL_PLAYER_DNE';
				return res.send(failedJson);
			}
			else {
				// Add player to cache
				const newCacheValue = {...filters.filterMojang(mojangJson), ...filters.filterName(playerJson)};
				client.set(newCacheValue.username, newCacheValue);
				client.set(newCacheValue.uuid, newCacheValue);
				Object.assign(successfulJson, newCacheValue);
			}
		}
		else if (playerResponse.status === 403) {
			failedJson.reason = 'HYPIXEL_ACCESS_DENIED';
			return res.send(failedJson);
		}
		else if (playerResponse.status >= 500) {
			failedJson.reason = 'HYPIXEL_API_DOWN';
			return res.send(failedJson);
		}
		else {
			failedJson.reason = 'UNKNOWN';
			return res.send(failedJson);
		}
	}

	client.close();
	return res.send(successfulJson);
}