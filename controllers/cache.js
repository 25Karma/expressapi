import express from 'express';
import { memjsClient } from '../utils/caches';

export const router = express.Router();

router.get('/cache/:slug', async (req, res) => {
	const client = memjsClient('NAME');
	const slug = req.params.slug;

	const cachedValue = await client.get(slug);

	client.close();

	return res.json(cachedValue);
});