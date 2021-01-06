import express from 'express';
import * as middlewares from '../middlewares';

export const router = express.Router();

router.get('/name/:slug', 
	middlewares.ratelimit(80),
	middlewares.slug,
	middlewares.name,
	middlewares.send);