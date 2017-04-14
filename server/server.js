const yeast = require('yeast');
const path = require('path');
const express = require('express');
const http = require('http');
const ws = require('ws');

const port = process.env.PORT || 23456;

console.log(process.argv);
console.log(`STARTING APP ON PORT ${port}`);

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
	socket.YeastID = yeast();

	socket.on('message', (d) => {
		const data = JSON.parse(d);

		switch (data.action) {
			case 'message':
				sock.clients.forEach(client => {
					if (client.YeastID !== socket.YeastID) {
						client.send(d);
					}
				});

				tsMessage(data.data.message);
				break;
			case 'ping':
				socket.send(JSON.stringify({action:'pong'}));

				break;
			default:
				return false;
		}
	})
});

server.listen(port);

const tsMessage = (m) => {
	const date = new Date().toTimeString();
	console.log(`${date}: ${m}`);
}