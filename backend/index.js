import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import OpenAI from 'openai';
import { generatePrompt, generateStats, generatePoetry } from './utils.js';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer for memory storage (no disk writes)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});

// Basic health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'identity90-backend' });
});

// Import and use routes
// Initialize OpenAI client pointing to Alibaba Cloud DashScope
const openai = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
});

// Generate Endpoint
app.post('/api/generate', upload.single('image'), async (req, res) => {
    try {
        const { region, vibe, path } = req.body;
        let base64Image = null;

        let faceFeatures = "";

        if (path === 'upload' && req.file) {
            base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

            if (process.env.DASHSCOPE_API_KEY && process.env.DASHSCOPE_API_KEY !== 'your_dashscope_api_key_here') {
                console.log("Extracting facial features with Qwen-VL-Max...");
                const vlResponse = await openai.chat.completions.create({
                    model: 'qwen-vl-max',
                    messages: [
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: 'Describe the facial features, age, and gender of the person in this photo concisely. Reply in english.' },
                                { type: 'image_url', image_url: { url: base64Image } }
                            ]
                        }
                    ]
                });
                faceFeatures = vlResponse.choices[0].message.content;
                console.log("Extracted Features:", faceFeatures);
            } else {
                console.warn("Skipping face extraction because DASHSCOPE_API_KEY is not set.");
            }
        }

        const constructedPrompt = generatePrompt(region, vibe, faceFeatures);

        // Simulate AI Generation if API Key is not configured
        if (!process.env.DASHSCOPE_API_KEY || process.env.DASHSCOPE_API_KEY === 'your_dashscope_api_key_here') {
            console.warn("DASHSCOPE_API_KEY is not set. Returning a mock response.");
            await new Promise(r => setTimeout(r, 2000));
            return res.json({
                success: true,
                data: {
                    imageUrl: "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?q=80&w=1000&auto=format&fit=crop",
                    stats: generateStats(),
                    poetry: generatePoetry(),
                    mocked: true,
                    faceFeatures
                }
            });
        }

        // Call Alibaba Cloud Qwen-Image-Max via DashScope Native Multimodal API
        console.log("Generating styled avatar with qwen-image-max...");
        const dashscopeRes = await fetch("https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation", {
            method: 'POST',
            body: JSON.stringify({
                model: "qwen-image-max",
                input: {
                    messages: [
                        { role: "user", content: [{ type: "text", text: constructedPrompt }] }
                    ]
                },
                parameters: { size: "1024*1024", n: 1 }
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.DASHSCOPE_API_KEY}`
            }
        });

        if (!dashscopeRes.ok) {
            const errorText = await dashscopeRes.text();
            throw new Error(`DashScope HTTP Error: ${errorText}`);
        }

        const dashscopeData = await dashscopeRes.json();

        if (dashscopeData.code && dashscopeData.code !== 'Success') {
            throw new Error(`DashScope API Error: ${dashscopeData.message}`);
        }

        const imageUrl = dashscopeData.output.choices[0].message.content[0].image;

        res.json({
            success: true,
            data: {
                imageUrl,
                stats: generateStats(),
                poetry: generatePoetry(),
                mocked: false,
                faceFeatures
            }
        });

    } catch (error) {
        console.error("AI Generation Error:", error.response?.data || error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate image.',
            details: error.response?.data || error.message || String(error)
        });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Identity90 backend listening at http://localhost:${PORT}`);
});
