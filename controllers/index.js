import express from 'express';

import cache from './cache';
import friends from './friends';
import guild from './guild';
import home from './home';
import name from './name';
import player from './player';

import { ratelimit } from '../middlewares';

export const router = express.Router();

router.get('/', home);

router.use('/cache/:slug', ratelimit(8));
router.get('/cache/:slug', cache);

router.use('/friends/:slug', ratelimit(8));
router.get('/friends/:slug', friends);

router.use('/guild/:slug', ratelimit(8));
router.get('/guild/:slug', guild);

router.use('/name/:slug', ratelimit(80));
router.get('/name/:slug', name);

router.use('/player/:slug', ratelimit(12));
router.get('/player/:slug', player);