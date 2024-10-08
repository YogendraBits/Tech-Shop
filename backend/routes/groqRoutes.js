import express from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama3-8b-8192", // Replace with your desired model
        });

        const reply = chatCompletion.choices[0]?.message?.content || "No response";
        res.json({ reply });
    } catch (error) {
        console.error("Error communicating with Groq API:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

export default router;
