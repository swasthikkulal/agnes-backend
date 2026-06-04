import express from "express"
import { createUser, getAllUsers } from "../controller/userController.js"

const router = express.Router()

router.post("/create-user", createUser)
router.get("/get-users", getAllUsers)



export default router