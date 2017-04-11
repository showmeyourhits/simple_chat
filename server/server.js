const path = require('path');
const express = require('express');
const http = require('http');
const ws = require('ws');

const [port] = process.argv.slice(2);

console.log('\nSTARTING APP RIGHT NOW');
const app = express();
const server = http.Server(app);
app.use(express.static('./client', {
	dotfiles: 'allow',
}));

app.get('/', (req, res) => {
	console.log('recieved request');
	res.sendFile(path.resolve(__dirname + '/index.html'));
});

console.log('INIT SOCKETS');

const sock = new ws.Server({server});

sock.on('connection', socket => {
	socket.on('message', (data) => {
		socket.send('me?');
	})
});

server.listen(port);
