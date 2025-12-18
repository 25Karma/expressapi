import express from 'express';
import * as middlewares from '../middlewares/index.js';

export const router = express.Router();

router.get('/achievements/:slug', 
	middlewares.ratelimit(10),
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