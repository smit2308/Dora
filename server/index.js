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

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
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
