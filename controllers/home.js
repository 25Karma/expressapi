import fs from 'fs';
import marked from 'marked';
import path from 'path';

export default function(req,res) {
	res.render(
		'index',
		{contents : marked(fs.readFileSync(path.resolve('./README.md'), 'utf8'))}
	);
}