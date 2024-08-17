import { getHypixelResource } from '../utils/requests';

export async function resources(req, res, next) {
	let json = null;
	if (req.route.path === '/achievements/:slug') json = await getHypixelResource('achievements');
	else if (req.route.path === '/quests/:slug')  json = await getHypixelResource('quests');

	if (json.response === 200) {
		res.locals.resources = json;
	}

	next();
}