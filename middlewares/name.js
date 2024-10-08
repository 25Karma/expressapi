import { memjsClient } from '../utils/caches';
import { getHypixelPlayer, getMojang } from '../utils/requests';
import { filterMojang, filterName } from '../utils/filters';

export async function name(req, res, next) {
	const slug = res.locals.slug;

	// Check cache
	let mc = memjsClient(slug);
	const cachedValue = await mc.get();
	mc.close();
	if (cachedValue !== null) {
		res.locals.name = cachedValue;
	}
	// If not in cache
	else {
		// GET Mojang
		const mojangJson = await getMojang(slug);
		if (mojangJson.response !== 200) {
			return res.send({success: false});
		}

		// GET Hypixel
		const uuid = mojangJson.uuid;
		const playerJson = await getHypixelPlayer(uuid);
		if (playerJson.response !== 200) {
			return res.send({success: false});
		}
		if (playerJson.player === null) {
			return res.send({success: false});
		}

		// Add player to cache
		const newCacheValue = {...filterMojang(mojangJson), ...filterName(playerJson)};
		mc = memjsClient(newCacheValue.username);
		mc.set(newCacheValue);
		mc.close();
		mc = memjsClient(newCacheValue.uuid);
		mc.set(newCacheValue);
		mc.close();
		res.locals.name = newCacheValue;
	}

	next();
}