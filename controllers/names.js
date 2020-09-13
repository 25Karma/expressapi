import express from 'express';

import { ratelimit } from '../middlewares';
import { cacheClient } from '../utils/caches';
import * as filters from '../utils/filters';
import * as requests from '../utils/requests';

export const names = express.Router();

names.use('/names/:slug', ratelimit(12));
names.get('/names/:slug', async (req,res) => {
	const client = cacheClient('NAME');
	const delimiter = '&';
	const slugList = req.params.slug.split(delimiter).slice(0,16);

	const cachedValues = await Promise.all(slugList.map(n => client.get(n)))
	const result = await Promise.all(slugList.map(async (slug,i) => {
		const cachedValue = cachedValues[i];
		if (cachedValue !== null) {
			return cachedValue;
		}
		else {
			const mojangResponse = await requests.getMojang(slug);
			if (!mojangResponse.ok) {
				return null;
			}
			const mojangJson = await mojangResponse.json();
			const hypixelResponse = await requests.getHypixelPlayer(mojangJson.uuid);
			if (!hypixelResponse.ok) {
				return null;
			}
			const hypixelJson = await hypixelResponse.json();

			const newCacheValue = {...filters.filterMojang(mojangJson), ...filters.filterName(hypixelJson)};
			client.set(newCacheValue.username, newCacheValue);
			client.set(newCacheValue.uuid, newCacheValue);
			return newCacheValue
		}
	}));

	res.send(result);
});