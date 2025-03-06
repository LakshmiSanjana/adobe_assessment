// server.js - API Server with Authentication & Rate Limiting
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

// Middleware to parse JSON
app.use(bodyParser.json());


app.use(cors());

// Set up rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

// Apply the rate limiter to all requests
app.use(limiter);

// JWT Authentication Middleware
// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');  // Get the Authorization header
  
    // If there's no token, return 401 Unauthorized
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    // Extract token after 'Bearer ' (remove 'Bearer' part)
    const bearerToken = token.split(' ')[1];  // 'Bearer <token>'

    // console.log("Bearer Token : ", bearerToken);  // Log the token for debugging purposes
    
    // If the token does not exist after 'Bearer ', return 401
    if (!bearerToken) return res.status(401).json({ message: 'Token is missing' });
  
    try {
      // Verify the token using the JWT_SECRET
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
      req.user = decoded;  // Attach the decoded user info to the request object
      next();  // Continue to the next middleware or route handler
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });  // If the token is invalid
    }
  };
  
// Route to authenticate user and issue JWT token
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic (you can replace with your own)
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // console.log("Token : ", token);
    res.json({ token });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Route to proxy API requests to the Application Server
app.use('/api/v1/contacts', authenticateJWT, async (req, res) => {
  try {
    // Forward the request to the Application Server
    const applicationServerResponse = await axios.get(`http://${host}:3001/api/v1/contacts`);
    res.json(applicationServerResponse.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the API server
app.listen(port, host, () => {
  console.log(`API Server is running at http://${host}:${port}`);
});
