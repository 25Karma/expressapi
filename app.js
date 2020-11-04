import express from 'express';

import { router } from './controllers';
import * as middlewares from './middlewares';

const app = express();
app.set('view engine', 'jade');
app.set('json spaces', 2);

app.use(express.static('static'))
app.use(middlewares.cors());
app.use(router);

app.listen(process.env.PORT || 8080);