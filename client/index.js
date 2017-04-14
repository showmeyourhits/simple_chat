const createMessage = (message) => {
	const mess = document.createElement('div');
	const date = new Date().toTimeString();

	mess.classList.add('message');
	mess.textContent = `${date}: ${message}`;

	return mess;
}

const showMessage = (message) => {
	const messages = document.getElementById('messages');
	messages.appendChild(createMessage(message));
}

const createSocket = () => {
	const {hostname, protocol, port} = window.location;
	const socket = new WebSocket((protocol.search('s') === -1 ? 'ws' : 'wss') + `://${hostname}:${port}`);
	
	return socket;
}

const initSocket = (socket) => {
	const sendForm = document.getElementById('send-form');

	sendForm.addEventListener('submit', (event) => {
		const message = document.getElementById('message-text').value;

		if (message) {
			console.log(message);
			socket.send(JSON.stringify({
				action: 'message',
				data: {message},
			}));
			showMessage(message);
		};
		event.preventDefault();
	});

	socket.onopen = (event) => {
		console.info('Opened connection');

		setInterval(() => {
			socket.send(JSON.stringify({action:'ping'}));
		}, 30000);
	};

	socket.onmessage = (event) => {
		console.info('Recieved message', event.data);
		const data = JSON.parse(event.data);

		if (data.action === 'message') {
			const date = new Date().toTimeString();

			showMessage(data.data.message);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	initSocket(createSocket());
});