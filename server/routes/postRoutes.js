import express from "express";
import * as dotenv from "dotenv";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();




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
        // console.log("Entered try block");
        const {name, prompt, image} = req.body;
        
    //    await cloudinary.v2.uploader
    //     .upload(image, { 
    //       public_id: `dalle/${name}`})
    //     .then(result=>console.log(result));

        // console.log("before database entry");

        const newPost = await Post.create({
          name,
          prompt,
          image ,
        });
        console.log(newPost, "created");
      
        res.status(201).json({success: true, data: newPost});
       
    }
    catch(error){
        res.status(500).json({success: false, message: error});
    }

});

export default router;