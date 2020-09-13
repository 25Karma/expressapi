import express from 'express';
import * as controllers from './controllers';
import * as middlewares from './middlewares';

const app = express();
app.set('view engine', 'jade');
app.set('json spaces', 2);

app.use(express.static('static'))
app.use(middlewares.cors());
app.use(controllers.home);
app.use(controllers.names);
app.use(controllers.player);

app.listen(process.env.port || 8080);