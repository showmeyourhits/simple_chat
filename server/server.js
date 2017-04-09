const path = require('path');
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const [port] = process.argv.slice(2);

console.log('STARTING APP RIGHT NOW');
const app = express();
app.use(express.static('./client', {
	dotfiles: 'allow',
}))

const appSocket = socket(http.Server(app));

app.get('/', (req, res) => {
	console.log('recieved request');
	res.sendFile(path.resolve(__dirname + '/index.html'));
});

app.listen(port);