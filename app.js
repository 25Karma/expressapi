import express from 'express';
import * as controllers from './controllers';
import * as middlewares from './middlewares';

const app = express();

app.set('view engine', 'jade')

app.use(express.static('static'))
app.use(middlewares.cors());
app.use(controllers.home);
app.use(middlewares.ratelimit());
app.use(controllers.player);

app.listen(process.env.port || 3000);