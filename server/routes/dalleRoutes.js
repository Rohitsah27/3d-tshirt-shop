import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize OpenAI client with the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Test route
router.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTERS" });
});

// Route to handle image generation
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        // Create an image with OpenAI
        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = response.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        if (error.code === 'billing_hard_limit_reached') {
            return res.status(403).json({ message: "Billing limit reached. Please check your OpenAI account." });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});


export default router;
