import { getHypixelGuild } from '../utils/requests';

export async function guild(req, res, next) { 
	const slug = res.locals.slug;
	const uuid = res.locals.mojang.uuid;
	const response = await getHypixelGuild(uuid);
	const json = await response.json();
	res.locals.guild = json.guild;
	if (!res.locals.guild && req.route.path === '/guild/:slug') {
		return res.send({success: false, slug, reason: 'HYPIXEL_GUILD_DNE'});
	}
	next();
}