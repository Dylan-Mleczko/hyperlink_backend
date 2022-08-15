import { Express } from 'express';

const PORT = 3000;

// require('dotenv').config({ path: '../config.env' });

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
// app.use(require('./routes'))

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
