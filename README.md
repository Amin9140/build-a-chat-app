# Build a Chat App

A real-time chat application built with Node.js and WebSockets, created as part of the freeCodeCamp Back End Development and APIs curriculum.

## Features

- Serves the chat page over HTTP
- Real-time messaging using WebSockets via the `ws` package
- Announces when users join and leave
- Broadcasts every message to all connected users instantly

## How it works

The HTTP server and the WebSocket server share the same port. When a browser connects, the server reads the username from the connection URL and announces that the user has joined. Each chat message is broadcast to everyone, including the sender, and a message is sent to the remaining users when someone disconnects.

## Getting started

1. Clone the repository and move into the folder:

   ```bash
   git clone https://github.com/Amin9140/build-a-chat-app.git
   cd build-a-chat-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open http://localhost:3001 in your browser. Try opening it in two tabs to chat with yourself.

## Project structure

- `server.js` - HTTP and WebSocket server (my implementation)
- `public/index.html` - chat interface (provided by freeCodeCamp)
- `public/script.js` - browser WebSocket client (provided by freeCodeCamp)

## Built with

- Node.js
- ws (WebSocket library)
