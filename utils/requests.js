import fetch from 'node-fetch';

const key = process.env.HYPIXEL_SECRET_KEY

export async function getMojang(slug) {
	const response = await fetch(`https://playerdb.co/api/player/minecraft/${slug}`);
	const json = await response.json();
	return {
		response: response.status,
		username: traverse(json, 'data.player.username'),
		uuid: traverse(json, 'data.player.id'),
	};
}

export async function getHypixelPlayer(uuid) {
	const response = await fetch(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`);
	const { player } = await response.json();
	return {
		response: response.status,
		player,
	};
}

export async function getHypixelStatus(uuid) {
	const response = await fetch(`https://api.hypixel.net/status?key=${key}&uuid=${uuid}`);
	const { session } = await response.json();
	return {
		response: response.status,
		status: session,
	};
}

export async function getHypixelGuild(uuid) {
	const response = await fetch(`https://api.hypixel.net/guild?key=${key}&player=${uuid}`);
	const { guild } = await response.json();
	return {
		response: response.status,
		guild,
	}
}

export async function getHypixelResource(endpoint) {
	const response = await fetch(`https://api.hypixel.net/resources/${endpoint}`);
	const json = await response.json();
	return {
		response: response.status,
		[endpoint]: json[endpoint],
	}
}

function traverse(json, path, defaultValue = undefined) {
	const paths = path.split('.');
	for (const p of paths) {
		if (json === undefined) return defaultValue;
		json = json[p];
	}
	if (json === undefined) return defaultValue;
	return json;
}
