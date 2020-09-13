import fetch from 'node-fetch';

const key = process.env.HYPIXEL_SECRET_KEY

function get(url) {
	const response = fetch(url);
	return response;
}

export function getMojang(slug) {
	return get(`https://api.ashcon.app/mojang/v2/user/${slug}`);
}

export function getHypixelPlayer(uuid) {
	return get(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`);
}
export function getHypixelStatus(uuid) {
	return get(`https://api.hypixel.net/status?key=${key}&uuid=${uuid}`);
}
export function getHypixelFriends(uuid) {
	return get(`https://api.hypixel.net/friends?key=${key}&uuid=${uuid}`);
}
export function getHypixelGuild(uuid) {
	return get(`https://api.hypixel.net/guild?key=${key}&player=${uuid}`);
}
