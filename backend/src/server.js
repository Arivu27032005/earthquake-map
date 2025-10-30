// Import required packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import axios from 'axios';

// Load environment variables from .env
dotenv.config();

// Create an Express app
const app = express();

// Set server port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for frontend running on localhost:5173
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from this origin
}));

// API route to fetch earthquake data from USGS
app.get('/api/earthquakes', async (req, res) => {
    try {
        // Make GET request to USGS earthquake feed (past 24 hours)
        const response = await axios.get(
            'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        // Send the data as JSON to frontend
        res.json(response.data);
    } catch (error) {
        // Log error and send 500 response if something goes wrong
        console.error('Error fetching earthquake data:', error);
        res.status(500).json({ error: 'Failed to fetch earthquake data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
