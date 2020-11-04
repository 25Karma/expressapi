import express from 'express';

import { cache } from './cache';
import { home } from './home';
import { guild } from './guild';
import { player } from './player';

import { ratelimit } from '../middlewares';

export const router = express.Router();

router.get('/', home);

router.use('/cache/:slug', ratelimit(8));
router.get('/cache/:slug', cache);

router.use('/guild/:slug', ratelimit(8));
router.get('/guild/:slug', guild);

router.use('/player/:slug', ratelimit(12));
router.get('/player/:slug', player);