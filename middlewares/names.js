import { memjsClient } from '../utils/caches';

export async function names(req, res, next) {
	let names = {};

	if (req.route.path === '/guild/:slug') {
		await Promise.all(res.locals.guild.members.map(async m => {
			const mc = memjsClient(m.uuid);
			const cachedValue = await mc.get();
			mc.close();
			if (cachedValue !== null) {
				names[m.uuid] = cachedValue;
			}
		}));
	}
	
	res.locals.names = names;
	next();
}
