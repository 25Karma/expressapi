import { getHypixelResource } from '../utils/requests';

export async function resources(req, res, next) {
	let response = null;
	if (req.route.path === '/achievements/:slug') response = await getHypixelResource('achievements');
	else if (req.route.path === '/quests/:slug')  response = await getHypixelResource('quests');

	if (response.ok) {
		const json = await response.json();
		res.locals.resources = json;
	}
	else {
		console.log(response)
	}

	next();
}