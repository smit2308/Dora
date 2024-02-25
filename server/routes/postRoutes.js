import express from "express";
import * as dotenv from "dotenv";


import {v2 as cloudinary} from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

// Get all posts
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
    });


// Create post in Database
router.route('/').post(async (req, res) => {
   
    try{
        console.log("Entered try block");
        const {name, prompt, image} = req.body;
        
        // const imageUrl = await cloudinary.uploader.upload(image);
        // console.log(imageUrl);
        console.log("before database entry");
        const newPost = await Post.create({
          name,
          prompt,
          image,
        });
        console.log(newPost, "created");
      
        res.status(201).json({success: true, data: newPost});
       
    }
    catch(error){
        res.status(500).json({success: false, message: error});
    }

});

export default router;