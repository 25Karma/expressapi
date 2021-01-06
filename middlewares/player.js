import { memjsClient } from '../utils/caches';
import { filterName, filterPlayer } from '../utils/filters';
import { getHypixelPlayer } from '../utils/requests';

export async function player(req, res, next) {
	// Call the Hypixel API
	const slug = res.locals.slug;
	const uuid = res.locals.mojang.uuid;
	const response = await getHypixelPlayer(uuid);
	if (response.ok) {
		const json = await response.json();
		if (json.player !== null) {
			res.locals.player = filterPlayer(json);

			const newCacheValue = Object.assign(
				{},
				res.locals.mojang,
				filterName(json)
			);

			// Update the value in the cache
			const mc = memjsClient('NAME');
			mc.set(res.locals.mojang.username, newCacheValue);
			mc.set(uuid, newCacheValue);
			mc.close();
		}
		else {
			return res.send({success: false, slug, reason: 'HYPIXEL_PLAYER_DNE'});
		}
	}
	else if (response.status === 403) {
		return res.send({success: false, slug, reason: 'HYPIXEL_ACCESS_DENIED'});
	}
	else if (response.status >= 500) {
		return res.send({success: false, slug, reason: 'HYPIXEL_API_DOWN'});
	}
	else {
		return res.send({success: false, slug, reason: 'UNKNOWN'});
	}
	
	next();
}