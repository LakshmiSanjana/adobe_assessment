// server.js - Express Setup using Router for Local & Production Environments
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import the routes from routes.js
const cors = require('cors'); // Enable CORS for cross-origin resource sharing

// Load environment variables from .env file for local development
require('dotenv').config();

const app = express();

// Use environment variables for PORT and HOST
const port = process.env.PORT || 3001; // Default to 3001 if PORT is not defined
const host = process.env.HOST || '0.0.0.0'; // Default to '0.0.0.0' for production or 'localhost' for local development

// Use body-parser to parse incoming requests with JSON payloads
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for cross-origin resource sharing

// Use the routes defined in routes.js
app.use('/',routes); // Attach the routes to the app

// Start the server and listen on the specified port and host
app.listen(port, host, () => {
    console.log(`Application Server is running at http://${host}:${port}`);
});
