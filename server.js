import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

// HTTP server that sends back the chat page
const server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading page');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

// WebSocket server attached to the HTTP server
const wss = new WebSocketServer({ server });

// send a message to every connected client
function broadcast(message) {
  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}

// runs once each time a new browser connects
wss.on('connection', (socket, req) => {
  const username = new URL(req.url, 'http://localhost').searchParams.get('username');

  broadcast({ type: 'system', text: `${username} joined` });

  // runs every time this user sends a chat message
  socket.on('message', (data) => {
    const { username, text } = JSON.parse(data.toString());
    broadcast({ type: 'chat', username, text });
  });

  // runs once when this user disconnects
  socket.on('close', () => {
    broadcast({ type: 'system', text: `${username} left` });
  });
});

// NEW: start listening for requests on port 3001
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});