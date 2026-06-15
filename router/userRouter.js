import express from "express"
import { createUser, deleteUser, findUserById, getAllUsers, updateUser, userLogin } from "../controller/userController.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/create-user", createUser)
router.post("/login-user", userLogin)
router.get("/get-users", getAllUsers)
router.get("/get-user", authMiddleware, findUserById)
router.delete("/delete-user/:id", deleteUser)
router.put("/update-user", authMiddleware, updateUser)



export default router