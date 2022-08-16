import config from 'config';
import express from 'express';
import cors from 'cors';
// import passport from 'passport';
import { connect } from './utils/db';

import { routes } from './web/api/routes';

const PORT = 3000;

const app = express();
app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

routes.forEach((route) => {
  app.use(route.router);
});

console.log(config.db.uri);

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
