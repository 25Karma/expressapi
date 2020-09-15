import { cacheClient } from '../utils/caches';

export async function cache(req, res) {
	const client = cacheClient('NAME');
	const slug = req.params.slug;

	const cachedValue = await client.get(slug);
	res.send(cachedValue);
}