require('dotenv').config();
const {PORT = 3000} = process.env;
const express = require('express');
const server = express();
const apiRouter = require('./api');

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
  
  next();
});

server.use('/api', apiRouter);
server.use(function(error, req, res, next) {
  console.error(error);
  res.send(error);
})

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
