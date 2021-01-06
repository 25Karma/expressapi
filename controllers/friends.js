import express from 'express';
import * as middlewares from '../middlewares';

export const router = express.Router();

router.get('/friends/:slug', 
	middlewares.ratelimit(8),
	middlewares.slug,
	middlewares.mojang,
	async (req, res, next) => {
		await Promise.all([
			middlewares.player(req, res, () => {}),
			middlewares.guild(req, res, () => {}),
			middlewares.friends(req, res, () => {})
			]);
		next();
	},
	middlewares.names,
	middlewares.send);