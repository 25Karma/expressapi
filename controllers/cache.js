import express from 'express';
import { memjsClient } from '../utils/caches';

export const router = express.Router();

router.get('/cache/:slug', async (req, res) => {
	const slug = req.params.slug;
	const mc = memjsClient(slug);

	const cachedValue = await mc.get();

	mc.close();

	return res.json(cachedValue);
});