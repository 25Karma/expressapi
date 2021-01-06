import express from 'express';

import * as controllers from './controllers';
import * as middlewares from './middlewares';

const app = express();
app.set('view engine', 'jade');
app.set('json spaces', 2);

app.use(express.static('static'))
app.use(middlewares.cors());

// Endpoints
app.use(controllers.cache);
app.use(controllers.friends);
app.use(controllers.guild);
app.use(controllers.home);
app.use(controllers.name);
app.use(controllers.player);

app.listen(process.env.PORT || 8080);