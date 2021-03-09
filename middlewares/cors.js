import expressCors from 'cors';

export function cors() {
	const options = {
		origin: [
			"https://25karma.xyz",
			"http://25karma.xyz",
			"http://localhost:3000",
		],
	};
	return expressCors(options);
}