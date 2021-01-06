import { getHypixelFriends } from '../utils/requests';

export async function friends(req, res, next) { 
	const uuid = res.locals.mojang.uuid;
	const response = await getHypixelFriends(uuid);
	const json = await response.json();
	res.locals.friends = json.records;
	next();
}