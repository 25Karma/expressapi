import { getHypixelStatus } from '../utils/requests';

export async function status(req, res, next) { 
	const uuid = res.locals.mojang.uuid;
	const json = await getHypixelStatus(uuid);
	res.locals.status = json.status;
	next();
}