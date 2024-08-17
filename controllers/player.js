import express from 'express';
import * as middlewares from '../middlewares';

export const router = express.Router();

router.get('/player/:slug', 
	middlewares.ratelimit(10),
	middlewares.slug,
	middlewares.mojang,
	async (req, res, next) => {
		await Promise.all([
			middlewares.player(req, res, () => {}),
			middlewares.status(req, res, () => {}),
			middlewares.guild(req, res, () => {})
			]);
		next();
	},
	middlewares.send);