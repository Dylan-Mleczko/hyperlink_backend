import config from 'config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { middlewarePassport } from './web/middleware/passport';
import { connect } from './utils/db';
import fileupload from 'express-fileupload';

import { routes } from './web/api/routes';
import cookieParser from 'cookie-parser';

const PORT = config.server.port;

console.log('--------- port: ' + PORT + '--------------');
console.log('--------- privateKey: ' + config.secrets.jwtPrivateKey + '--------------');
const app = express();
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(express.static(__dirname + '/public'));
// console.log(__dirname + '/../public');
app.use(cors(corsOptions)); // Enable All CORS Requests
app.use(express.json({ limit: '2mb' })); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(fileupload());

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
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// use all api routes
routes.forEach((route) => {
  app.use(route.router);
});

console.log(config.db.uri);

const startServer = async () => {
  await connect(config.db.uri);

  // const port = config.get('server.port');
  app.listen(PORT, '0.0.0.0', () => {
    console.log('Server is listening on port: ' + PORT);
  });
};

startServer();

// connect(config.db.uri).then(() => {
//   app.listen(PORT, () => {
//     console.log('Server is listening on port: ' + PORT);
//   });
// });
