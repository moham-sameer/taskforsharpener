const fs = require('fs');
const path = require('path');

// Path to the file where messages will be stored
const messageFilePath = path.join(__dirname, '../data/messages.json');

class Message {
    constructor(username, message) {
        this.username = username;
        this.message = message;
    }

    // Save the message to the file
    save() {
        // Read existing messages from the file
        Message.fetchAll(messages => {
            messages.push(this);  // Add the new message
            fs.writeFile(messageFilePath, JSON.stringify(messages), (err) => {
                if (err) {
                    console.log('Error writing file:', err);
                }
            });
        });
    }

    // Static method to fetch all messages from the file
    static fetchAll(callback) {
        fs.readFile(messageFilePath, (err, data) => {
            if (err) {
                // If file doesn't exist or there's an error, return an empty array
                return callback([]);
            }
            try {
                const messages = JSON.parse(data);
                callback(messages);
            } catch (parseErr) {
                console.log('Error parsing JSON:', parseErr);
                callback([]);
            }
        });
    }
}

module.exports = Message;
