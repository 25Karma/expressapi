export function filterMojang(json) {
	const filtered = {};
	['username', 'uuid'].forEach(n => {filtered[n] = json[n]});
	return filtered;
}

export function filterPlayer(json) {
	const player = json.player;
	const filtered = {};
	[
		'achievementPoints',
		'displayname',
		'eulaCoins',
		'firstLogin',
		'karma',
		'knownAliases',
		'lastLogin',
		'lastLogout',
		'monthlyPackageRank',
		'monthlyRankColor',
		'networkExp',
		'newPackageRank',
		'packageRank',
		'petConsumables',
		'petStats',
		'playername',
		'prefix',
		'rank',
		'rankPlusColor',
		'socialMedia',
		'stats',
		'tournamentTokens',
		'tourney',
		'userLanguage',
		'uuid',
	].forEach(n => {filtered[n] = player[n]});

	let questsCompleted = 0;
	const quests = player.quests;
	if (quests !== undefined) {
		for (const [k,v] of Object.entries(quests)) {
			if (v.completions !== undefined) {
				questsCompleted += v.completions.length;
			}
		}
	}
	filtered.questsCompleted = questsCompleted;
	return filtered;
}

export function filterFriends(json) {
	const records = json.records;
	if (json.success && records) {
		return records.length;
	}
	else {
		return records;
	}
}