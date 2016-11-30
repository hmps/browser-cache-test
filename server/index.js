const http = require('http');
const express = require('express');

const state = {
  authed: false,
};
//======================================================
// APP
//======================================================
const app = express();
app.server = http.createServer(app);
app.use(setHeaders);
app.server.listen(4728);

const users = [
  { name: 'User 1', password: 'plaintext', id: 1 },
  { name: 'User 2', password: 'alsplaintext', id: 2 },
  { name: 'User 3', password: 'plaintextyes',id: 3 },
];

app.get('/logout', function (req, res) {
  state.authed = false;
  res.status(200);
  res.send('unauthed');
});

app.get('/login', function (req, res) {
  state.authed = true;
  res.status(200);
  res.send('authed');
});

app.get('/status', function (req, res) {
  res.status(200);
  res.send(state.authed);
});

app.get('/users', function (req, res) {
  if (state.authed) {
    res.status(200);
    res.send(users);
  } else {
    res.status(401);
    res.send();
  }
});

function setHeaders(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');

  next();
}
