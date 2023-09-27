export function slug(req, res, next) {
	res.locals.success = true;
	res.locals.slug = req.params.slug;
	// Make sure the slug is a valid Minecraft username or UUID
	// i.e. only contains alphanumeric characters, underscores, and dashes
	const reUsername = /^[a-zA-Z0-9_]{1,16}$/;
	const reUUID = /[0-9a-fA-F-]{36}|[0-9a-fA-F]{32}/
	if (!(new RegExp(`${reUsername.source}|${reUUID.source}`)).test(res.locals.slug)) {
		return res.send({success: false, slug: res.locals.slug, reason: 'MOJANG_PLAYER_DNE'});
	}
	next();
}