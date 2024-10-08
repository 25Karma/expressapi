import { memjsClient } from '../utils/caches';
import * as filters from '../utils/filters';
import { getHypixelPlayer } from '../utils/requests';

export async function player(req, res, next) {
	// Call the Hypixel API
	const slug = res.locals.slug;
	const uuid = res.locals.mojang.uuid;
	const json = await getHypixelPlayer(uuid);
	if (json.response === 200) {
		if (json.player !== null) {

			// Filter for different data in the player json depending on the request route
			if      (req.route.path === '/achievements/:slug') res.locals.player = filters.filterPlayerForAchievements(json);
			else if (req.route.path === '/pets/:slug')         res.locals.player = filters.filterPlayerForPets(json);
			else if (req.route.path === '/player/:slug')       res.locals.player = filters.filterPlayerForPlayer(json);
			else if (req.route.path === '/quests/:slug')       res.locals.player = filters.filterPlayerForQuests(json);

			const newCacheValue = Object.assign(
				{},
				res.locals.mojang,
				filters.filterName(json)
			);

			// Update the value in the cache
			let mc = memjsClient(res.locals.mojang.username);
			mc.set(newCacheValue);
			mc.close();
			mc = memjsClient(uuid);
			mc.set(newCacheValue);
			mc.close();
		}
		else {
			return res.send({success: false, slug, reason: 'HYPIXEL_PLAYER_DNE'});
		}
	}
	else if (json.response === 403) return res.send({success: false, slug, reason: 'HYPIXEL_ACCESS_DENIED'});
	else if (json.response === 429) return res.send({success: false, slug, reason: 'HYPIXEL_THROTTLED'});
	else if (json.response >=  500) return res.send({success: false, slug, reason: 'HYPIXEL_DOWN'});
	else                              return res.send({success: false, slug, reason: 'UNKNOWN'});
	
	next();
}