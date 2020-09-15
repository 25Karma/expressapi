import fs from 'fs';
import marked from 'marked';
import path from 'path';

export function home(req,res) {
	res.render(
		'index',
		{contents : marked(fs.readFileSync(path.resolve('./README.md'), 'utf8'))}
	);
}