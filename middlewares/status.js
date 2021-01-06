import { getHypixelStatus } from '../utils/requests';

export async function status(req, res, next) { 
	const uuid = res.locals.mojang.uuid;
	const response = await getHypixelStatus(uuid);
	const json = await response.json();
	res.locals.status = json.session;
	next();
}