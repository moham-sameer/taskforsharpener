const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Serve the HTML form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <body>
          <h2>Send a message</h2>
          <form action="/message" method="POST">
            <input type="text" name="message" placeholder="Type your message" />
            <button type="submit">Send</button>
          </form>
        </body>
      </html>
    `);
    res.end();
  } else if (req.method === 'POST') {
    // Handle the form submission
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedData = querystring.parse(body);
      const message = parsedData.message || 'No message provided';

      // Respond with the HTML page containing the message
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
        <html>
          <body>
            <h2> ${message}</h2>
            <a href="/">Send another message</a>
          </body>
        </html>
      `);
      res.end();
    });
  }
});

server.listen(4000, () => {
  console.log('Server is running on port 4000...');
});
