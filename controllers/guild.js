import express from 'express';
import * as middlewares from '../middlewares';

export const router = express.Router();

router.get('/guild/:slug', 
	middlewares.ratelimit(10),
	middlewares.slug,
	middlewares.mojang,
	middlewares.guild,
	middlewares.names,
	middlewares.send);