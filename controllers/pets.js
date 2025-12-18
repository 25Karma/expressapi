import express from 'express';
import * as middlewares from '../middlewares/index.js';

export const router = express.Router();

router.get('/pets/:slug', 
	middlewares.ratelimit(10),
	middlewares.slug,
	middlewares.mojang,
	middlewares.player,
	middlewares.send);