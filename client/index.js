const createMessage = (message) => {
	const mess = document.createElement('div');

	mess.classList.add('message');
	mess.textContent = message;

	return mess;
}

document.addEventListener('DOMContentLoaded', () => {
	const messages = document.getElementById('messages');
	messages.appendChild(createMessage('ass like dat'));
});