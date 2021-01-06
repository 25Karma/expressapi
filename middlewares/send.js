export function send(req, res) {
	if (!res.headersSent) {
		return res.json(res.locals);
	}
}