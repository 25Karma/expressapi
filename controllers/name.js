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
		const hypixelResponse = await requests.getHypixelPlayer(uuid);
		if (!hypixelResponse.ok) {
			return res.send(failedJson);
		}
		const hypixelJson = await hypixelResponse.json();

		// Add player to cache
		const newCacheValue = {...filters.filterMojang(mojangJson), ...filters.filterName(hypixelJson)};
		client.set(newCacheValue.username, newCacheValue);
		client.set(newCacheValue.uuid, newCacheValue);
		Object.assign(successfulJson, newCacheValue);
	}

	client.close();
	return res.send(successfulJson);
}