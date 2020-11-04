import { cacheClient } from '../utils/caches';
import * as filters from '../utils/filters';
import * as requests from '../utils/requests';

export async function guild(req, res) {
	const client = cacheClient('NAME');
	const slug = req.params.slug;
	let successfulJson = {success: true, slug};
	let failedJson = {success: false, slug};
	
	// Get the slug from the cache
	let mojang = null;
	const cachedValue = await client.get(slug);
	if (cachedValue !== null) {
		mojang = cachedValue;
	}

	// If slug is not found in cache, call the Mojang API
	else {
		const mojangResponse = await requests.getMojang(slug);
		if (mojangResponse.ok) {
			mojang = await mojangResponse.json();
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

	const guildResponse = await requests.getHypixelGuild(mojang.uuid);
	successfulJson.guild = (await guildResponse.json()).guild;
	const rateLimitRemaining = guildResponse.headers.get('ratelimit-remaining');
	const rateLimitBuffer = 30;

	if (successfulJson.guild) {
		let membersToFetch = Math.max(rateLimitRemaining - rateLimitBuffer, 0);
		const memberList = successfulJson.guild.members;
		const memberJsonList = await Promise.all(memberList.map(async n => {
			const cachedValue = await client.get(n.uuid);
			const uuid = n.uuid;
			if (cachedValue !== null) {
				return {[uuid]: cachedValue};
			}
			else if (membersToFetch > 0) {
				membersToFetch--;
				const mojangResponse = await requests.getMojang(uuid);
				if (!mojangResponse.ok) {
					return null;
				}
				const mojangJson = await mojangResponse.json();
				const hypixelResponse = await requests.getHypixelPlayer(uuid);
				if (!hypixelResponse.ok) {
					return null;
				}
				const hypixelJson = await hypixelResponse.json();

				const newCacheValue = {...filters.filterMojang(mojangJson), ...filters.filterName(hypixelJson)};
				client.set(newCacheValue.username, newCacheValue);
				client.set(newCacheValue.uuid, newCacheValue);
				return {[uuid]: newCacheValue};
			}
			else {
				return null;
			}
		}));
		successfulJson.members = Object.assign({}, ...memberJsonList);
	}
	else {
		failedJson.reason = 'HYPIXEL_GUILD_DNE';
		return res.send(failedJson);
	}

	client.close();

	return res.json(successfulJson);
}