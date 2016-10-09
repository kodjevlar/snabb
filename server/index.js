require('babel-core/register')({
  presets: ['es2015', 'react']
});
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.static('public'));
app.use(require('./routes').default);

server.listen(3000 || process.env.PORT, function() {
  console.log(`${server.address().port}`);
});

module.exports = server;
