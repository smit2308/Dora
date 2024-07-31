import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://dora-ai.vercel.app',
    methods: 'GET, POST, OPTIONS',
    allowedHeaders: 'Content-Type, Accept'
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from DALL.E!',
    });
});

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server is running on port http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }
};

startServer();
