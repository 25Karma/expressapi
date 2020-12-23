import { cacheClient } from '../utils/caches';

export default async function(req, res) {
	const client = cacheClient('NAME');
	const slug = req.params.slug;

	const cachedValue = await client.get(slug);

	client.close();

	return res.json(cachedValue);
}