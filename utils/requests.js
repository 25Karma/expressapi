import fetch from 'node-fetch';

const key = process.env.HYPIXEL_SECRET_KEY

export async function getMojang(slug) {
	const response = await fetch(`https://mowojang.seraph.si/${slug}`);
	const json = await response.json();
	return {
		response: response.status,
		username: json?.name,
		uuid: normalizeUUID(json?.id),
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

function normalizeUUID(uuid) {
    if (uuid && !uuid.includes("-")) {
        return [uuid.slice(0, 8), uuid.slice(8, 12), uuid.slice(12, 16), uuid.slice(16, 20), uuid.slice(20)].join('-')
    }
    return uuid;
}
