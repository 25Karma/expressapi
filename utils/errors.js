export function sendHypixelError(res, slug, code) {
	let reason;
	if (code === 403) reason = 'HYPIXEL_ACCESS_DENIED';
	else if (code === 429) reason = 'HYPIXEL_THROTTLED';
	else if (code >= 500) reason = 'HYPIXEL_DOWN';
	else reason = 'UNKNOWN';
	return res.send({ success: false, slug, reason });
}
