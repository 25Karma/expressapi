import expressCors from 'cors';

export function cors(req, res, next) {
	const options = {
		origin: [
			"https://25karma.github.io",
			"http://localhost:3000",
			"http://127.0.0.1:9000",
		],
	};
	return expressCors(options);
}