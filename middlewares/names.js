import { memjsClient } from '../utils/caches';

export async function names(req, res, next) {
	const mc = memjsClient('NAME');
	let names = {};

	if (req.route.path === '/guild/:slug') {
		await Promise.all(res.locals.guild.members.map(async m => {
			const cachedValue = await mc.get(m.uuid);
			if (cachedValue !== null) {
				names[m.uuid] = cachedValue;
			}
		}));
	}
	else if (req.route.path === '/friends/:slug') {
		await Promise.all(res.locals.friends.slice(0,220).map(async f => {
			const uuid = getFriendUUID(res.locals.mojang.uuid, f)
			const cachedValue = await mc.get(uuid);
			if (cachedValue !== null) {
				names[uuid] = cachedValue;
			}
		}));
	}

	res.locals.names = names;
	mc.close();
	next();
}

function getFriendUUID(playerUUID, friendData) {
	playerUUID = playerUUID.replace(/-/g, '');
	return friendData.uuidSender === playerUUID ? friendData.uuidReceiver : friendData.uuidSender;
}