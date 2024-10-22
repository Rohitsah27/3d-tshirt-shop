import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dalleRoutes from './routes/dalleRoutes.js'; // Adjust the path as necessary

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080; // Use the PORT from .env or fallback to 8080

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.use('/api/v1/dalle', dalleRoutes); // Use your routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
