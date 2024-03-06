import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
  app.use(cors());
  
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
  // Handle OPTIONS requests for all routes
app.get("/", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }
    // res.send("Hello from DALL-E Cloneaazzzzaaaa");
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
