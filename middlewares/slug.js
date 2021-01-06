export function slug(req, res, next) {
	res.locals.success = true;
	res.locals.slug = req.params.slug;
	next();
}