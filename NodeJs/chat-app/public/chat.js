document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    const messageForm = document.getElementById('messageForm');
    const chatbox = document.getElementById('chatbox');

    // Fetch and display messages
    function loadMessages() {
        fetch('/messages')
            .then(response => response.json())
            .then(messages => {
                chatbox.innerHTML = '';
                messages.forEach(({ username, message }) => {
                    const messageElement = document.createElement('p');
                    messageElement.textContent = `${username}: ${message}`;
                    chatbox.appendChild(messageElement);
                });
            });
    }

    loadMessages(); // Initial load

    // Send message
    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const message = document.getElementById('message').value;

        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message })
        }).then(() => {
            document.getElementById('message').value = ''; // Clear the input
            loadMessages(); // Reload messages
        });
    });

    // Auto-reload messages every few seconds
    setInterval(loadMessages, 3000);
});
