const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

// Create an Express server
const app = express();

// Set up CORS to allow all origins (or specify your allowed origins)
app.use(cors());

// Start the HTTP server
const server = app.listen(8080, () => {
  console.log('HTTP server listening on port 8080');
});

// Set up the WebSocket server with the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Handle incoming messages
  ws.on('message', (message) => {
    console.log('Received message: ', message);
    
    // Broadcast the message to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Send a welcome message when a client connects
  ws.send('Welcome to the chat!');
});
