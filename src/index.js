import config from 'config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { middlewarePassport } from './web/middleware/passport';
import { connect } from './utils/db';

import { routes } from './web/api/routes';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3050;

const app = express();
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions)); // Enable All CORS Requests
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// use passport for authentication
console.log('Passport initialize');
app.use(passport.initialize()); // passport init

console.log('Middleware passport enable');
middlewarePassport(passport);
app.use((req, res, next) => {
  req.passport = passport;
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  next();
});

// set headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// use all api routes
routes.forEach((route) => {
  app.use(route.router);
});

console.log(config.db.uri);

app.get('/api', (req, res) => res.send('It is working'));

const startServer = async () => {
  await connect(config.db.uri);

  // const port = config.get('server.port');
  app.listen(PORT, () => {
    console.log('Server is listening on port: ' + PORT);
  });
};

startServer();

// connect(config.db.uri).then(() => {
//   app.listen(PORT, () => {
//     console.log('Server is listening on port: ' + PORT);
//   });
// });
