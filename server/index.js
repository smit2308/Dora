import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
// changes here
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello From dall e!');
    });

const startServer = async () => {

    try {
        
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () =>  console.log('Server is running on port http://localhost:8080'))
    }
    catch (error) {
        console.log(error);
    }

  
}
startServer();
