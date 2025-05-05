import express from "express";
import * as dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI(
    {
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
}
);

router.route('/').get((req, res) => {
    res.send('Hello From dalle!');
}   );

router.route('/').post(async (req, res) => {
    try {
        const {prompt, model, quality, style} = req.body;
        
        // console.log(prompt, model, quality, style, "prompt model quality style")
       
        let aiResponse;

        if (model === 'dall-e-3') {
          aiResponse = await openai.images.generate({
            model: model,
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: quality,
            style: style
         
          });
        } else {
          aiResponse = await openai.images.generate({
            model: model,
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
          });
        }

        const image = aiResponse.data[0].b64_json;
        res.status(200).json({image: image});
        // console.log(image, "image generated");
    } catch (error) {
        console.log(error);
        // res.status(500).send(error?.response.data.error.message)
    }
});

export default router;