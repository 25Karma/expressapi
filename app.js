import express from 'express';

import * as controllers from './controllers';
import * as middlewares from './middlewares';

const app = express();
app.set('view engine', 'jade');
app.set('json spaces', 2);
app.set('trust proxy', true);

app.use(express.static('static'));
app.use(middlewares.cors());

// Endpoints
for (const controller of Object.values(controllers)) {
	app.use(controller);
}

app.listen(process.env.PORT || 8080);