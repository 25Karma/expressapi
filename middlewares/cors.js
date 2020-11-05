import expressCors from 'cors';

export function cors(req, res, next) {
	const options = {
		origin: [
			"https://25karma.xyz",
			"http://localhost:3000",
		],
	};
	return expressCors(options);
}