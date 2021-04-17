import express from 'express';
import * as middlewares from '../middlewares';

export const router = express.Router();

router.get('/quests/:slug', 
	middlewares.ratelimit(12),
	middlewares.slug,
	middlewares.mojang,
	async (req, res, next) => {
		await Promise.all([
			middlewares.player(req, res, () => {}),
			middlewares.resources(req, res, () => {})
			]);
		next();
	},
	middlewares.send);