const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

// function logger(req, res, next) {logger()

  //logger logs to the console the following information about each request: request method, request url, and a timestamp
  //this middleware runs on every request made to the API

//};

module.exports = server;
