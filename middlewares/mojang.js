import { memjsClient } from '../utils/caches';
import { filterMojang } from '../utils/filters';
import { getMojang } from '../utils/requests';

export async function mojang(req, res, next) {
	const slug = res.locals.slug;
	
	// Get the value from the cache
	const mc = memjsClient(slug);
	const cachedValue = await mc.get();
	mc.close();
	if (cachedValue !== null) {
		res.locals.mojang = filterMojang(cachedValue);
	}
	
	// If slug is not found in cache, call the Mojang API
	else {
		const json = await getMojang(slug);
		if (json.response === 200) {
			res.locals.mojang = filterMojang(json);
		}
		else if (json.response === 404) return res.send({success: false, slug, reason: 'MOJANG_CALL_FAILED'});
		else if (json.response === 400) return res.send({success: false, slug, reason: 'MOJANG_PLAYER_DNE'});
		else if (json.response === 429) return res.send({success: false, slug, reason: 'MOJANG_RATELIMITED'});
		else                                    return res.send({success: false, slug, reason: 'UNKNOWN'});
	}
	next();
}
