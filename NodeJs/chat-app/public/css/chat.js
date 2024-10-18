// Function to send a message to the server
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (message.trim() === '') {
        return;  // Don't send empty messages
    }

    const username = localStorage.getItem('username');  // Retrieve username from local storage
    if (!username) {
        alert("Username not found! Please log in first.");
        return;
    }

    // Create the message object
    const messageData = {
        username: username,
        message: message
    };

    // Send the message to the server using Fetch API
    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(data => {
        // Display the new message on the chat window
        displayMessage(data.username, data.message);
    })
    .catch(error => console.error('Error:', error));

    // Clear the input after sending
    messageInput.value = '';
}

// Function to display a message in the chat window
function displayMessage(username, message) {
    const messageContainer = document.getElementById('message-container');
    
    // Create a new div to hold the message
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Set the message content
    messageElement.innerHTML = `<strong>${username}</strong>: ${message}`;
    
    // Append the new message to the message container
    messageContainer.appendChild(messageElement);

    // Scroll to the bottom of the message container (auto-scroll)
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Auto-load messages on page load
window.onload = function() {
    fetchMessages();
};

// Fetch previous messages from the server and display them
function fetchMessages() {
    fetch('/messages')
        .then(response => response.json())
        .then(messages => {
            messages.forEach(msg => {
                displayMessage(msg.username, msg.message);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

// Attach the sendMessage function to the "Send" button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Optionally, you can allow sending a message via the "Enter" key
document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
