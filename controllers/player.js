import express from 'express';

import { cacheClient } from '../utils/caches';
import * as filters from '../utils/filters';
import * as requests from '../utils/requests';

export const player = express.Router();

player.get('/player/:slug', async (req,res) => {
	const client = cacheClient('NAME')
	const slug = req.params.slug;
	let successfulJson = {success: true, slug};
	let failedJson = {success: false, slug};
	
	// Get the value from the cache
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
	
	// Call the Hypixel API
	const uuid = successfulJson.mojang.uuid;
	const hypixelResponses = await Promise.all([
		requests.getHypixelPlayer(uuid),
		requests.getHypixelStatus(uuid),
		requests.getHypixelFriends(uuid),
		requests.getHypixelGuild(uuid),
	]);
	const [playerResponse, statusResponse, friendsResponse, guildResponse] = hypixelResponses;
	if (playerResponse.ok) {
		const playerJson = await playerResponse.json();
		if (playerJson.player !== null) {
			successfulJson.player = filters.filterPlayer(playerJson);
		}
		else {
			failedJson.reason = 'HYPIXEL_PLAYER_DNE';
			return res.send(failedJson);
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
	successfulJson.status = (await statusResponse.json()).session;
	successfulJson.friends = filters.filterFriends(await friendsResponse.json());
	successfulJson.guild = (await guildResponse.json()).guild;
	
	// Add to the cache if the entry was not found previously
	if (cachedValue === null) {
		client.set(slug, Object.assign(
			{},
			successfulJson.mojang,
			...[
				'rank', 
				'monthlyPackageRank', 
				'newPackageRank', 
				'packageRank', 
				'prefix', 
				'rankPlusColor', 
				'monthlyRankColor'
			].map(n => ({[n]: successfulJson.player[n]}))
		));
	}
	
	// Send the data to the endpoint
	return res.send(successfulJson)
});