import express from "express";
import { connectDB } from "./config/database.js";
import userRouter from "./router/userRouter.js"

const app = express()
const Port = 5000;
app.use(express.json())
connectDB()

app.get("/abcd", (req, res) => {
    res.send("Api is working")
})

app.use("/api", userRouter)





app.listen(Port, () => {
    console.log(`server is running on port ${Port}`)
})