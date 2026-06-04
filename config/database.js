import mongoose from "mongoose";

export const connectDB = ()=>{
  mongoose.connect("mongodb://localhost:27017/agnes")
  .then(()=>{
    console.log("mongo connected")
  })
  .catch((err)=>{
    console.log("mongo error")
  })
}





 


