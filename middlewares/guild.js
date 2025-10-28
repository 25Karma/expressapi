import { getHypixelGuild } from '../utils/requests';
import { sendHypixelError } from '../utils/errors';

export async function guild(req, res, next) { 
	const slug = res.locals.slug;
	const uuid = res.locals.mojang.uuid;
	const json = await getHypixelGuild(uuid);

	if (json.response === 200) {
		res.locals.guild = json.guild;
		if (!res.locals.guild && req.route.path === '/guild/:slug') {
			return res.send({success: false, slug, reason: 'HYPIXEL_GUILD_DNE'});
		}
	}
	else return sendHypixelError(res, slug, json.response);

	next();
}