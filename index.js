import express from "express";

import { connectDB } from "./config/database.js";
import userRouter from "./router/userRouter.js"
import tweetRouter from "./router/tweetRouter.js"
import cors from "cors"

const app = express()

const Port = 5000;

app.use(express.json())
app.use(cors())
connectDB()

app.get("/abcd", (req, res) => {
    res.send("Api is working")
})

app.use("/api", userRouter)
app.use("/api", tweetRouter)
app.use("/uploads", express.static("uploads"))





app.listen(Port, () => {
    console.log(`server is running on port ${Port}`)
})