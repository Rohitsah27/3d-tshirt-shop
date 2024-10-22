import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalleRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all origins
app.use(express.json());  // Parse incoming JSON requests

// Routes
app.use('/api/v1/dalle', dalleRoutes);  // Add the DALL-E routes

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
