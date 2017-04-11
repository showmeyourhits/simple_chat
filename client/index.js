const createMessage = (message) => {
	const mess = document.createElement('div');

	mess.classList.add('message');
	mess.textContent = message;

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

document.addEventListener('DOMContentLoaded', () => {
	showMessage('hey baby, wanna fuck?');

	const socket = createSocket();

	socket.onopen = (event) => {
		socket.send(JSON.stringify({action: 'fuck'}));
	};

	socket.onmessage = (event) => {
		showMessage(event.data);
	}
});