import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true)   
    mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

}

export default connectDB;

