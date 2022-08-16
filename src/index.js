import config from 'config';
import express from 'express';
import cors from 'cors';
import { connect } from './utils/db';

// import appRoutes from './web';

const PORT = 3000;

const app = express();
app.use(cors()); // Enable All CORS Requests

// appRoutes.clinician.forEach((route) => {
//   app.use(route);
// });

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
