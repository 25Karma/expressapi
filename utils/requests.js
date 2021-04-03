import fetch from 'node-fetch';

const key = process.env.HYPIXEL_SECRET_KEY

export function getMojang(slug) {
	return fetch(`https://api.ashcon.app/mojang/v1/user/${slug}`);
}

export function getHypixelPlayer(uuid) {
	return fetch(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`);
}
export function getHypixelStatus(uuid) {
	return fetch(`https://api.hypixel.net/status?key=${key}&uuid=${uuid}`);
}
export function getHypixelFriends(uuid) {
	return fetch(`https://api.hypixel.net/friends?key=${key}&uuid=${uuid}`);
}
export function getHypixelGuild(uuid) {
	return fetch(`https://api.hypixel.net/guild?key=${key}&player=${uuid}`);
}
