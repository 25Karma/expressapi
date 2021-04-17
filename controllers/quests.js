import express from 'express';
import * as middlewares from '../middlewares';

export const router = express.Router();

router.get('/quests/:slug', 
	middlewares.ratelimit(12),
	middlewares.slug,
	middlewares.mojang,
	middlewares.player,
	middlewares.send);