export function filterMojang(json) {
	const filtered = {};
	['username', 'uuid'].forEach(n => {filtered[n] = json[n]});
	return filtered;
}

export function filterPlayerForAchievements(json) {
	const filtered = {};
	[
		'achievements',
		'achievementsOneTime',
		'achievementPoints',
		'karma',
		'networkExp',

		'monthlyPackageRank',
		'monthlyRankColor',
		'newPackageRank',
		'packageRank',
		'prefix',
		'rank',
		'rankPlusColor',
	].forEach(n => {filtered[n] = json.player[n]});
	return filtered;
}

export function filterPlayerForPets(json) {
	const filtered = {};
	[
		'currentPet',
		'petConsumables',
		'petJourneyTimestamp',
		'petStats',
		'karma',
		'networkExp',

		'monthlyPackageRank',
		'monthlyRankColor',
		'newPackageRank',
		'packageRank',
		'prefix',
		'rank',
		'rankPlusColor',
	].forEach(n => {filtered[n] = json.player[n]});
	return filtered;
}

export function filterPlayerForPlayer(json) {
	const player = json.player;
	const filtered = {};
	[
		'achievements',
		'achievementPoints',
		'eugene',
		'eulaCoins',
		'firstLogin',
		'karma',
		'knownAliases',
		'lastLogin',
		'lastLogout',
		'networkExp',
		'rewardScore',
		'rewardHighScore',
		'socialMedia',
		'stats',
		'totalDailyRewards',
		'totalRewards',
		'tournamentTokens',
		'tourney',
		'userLanguage',

		'monthlyPackageRank',
		'monthlyRankColor',
		'newPackageRank',
		'packageRank',
		'prefix',
		'rank',
		'rankPlusColor',
	].forEach(n => {filtered[n] = player[n]});

	let questsCompleted = 0;
	const quests = player.quests;
	if (quests !== undefined) {
		for (const [,v] of Object.entries(quests)) {
			if (v.completions !== undefined) {
				questsCompleted += v.completions.length;
			}
		}
	}
	filtered.questsCompleted = questsCompleted;
	return filtered;
}

export function filterPlayerForQuests(json) {
	const filtered = {};
	[
		'quests',
		'karma',
		'networkExp',

		'monthlyPackageRank',
		'monthlyRankColor',
		'newPackageRank',
		'packageRank',
		'prefix',
		'rank',
		'rankPlusColor',
	].forEach(n => {filtered[n] = json.player[n]});
	return filtered;
}

export function filterName(json) {
	const player = json.player;
	const filtered = {};
	[
		'rank', 
		'monthlyPackageRank', 
		'newPackageRank', 
		'packageRank', 
		'prefix', 
		'rankPlusColor', 
		'monthlyRankColor'
	].map(n => {filtered[n] = player[n]});
	return filtered;
}