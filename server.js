const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
function logger(req, res, next) {
  console.log(req.method,
              req.url,
              new Date());
              next();
}
  //logger logs to the console the following information about each request: request method, request url, and a timestamp
  //this middleware runs on every request made to the API

module.exports = server;
