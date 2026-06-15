import userModel from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_KEY = "expressbackend"

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(name, email, password)
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" })
        }

        const findExistingUser = await userModel.findOne({ email })
        if (findExistingUser) {
            return res.json({ success: false, message: "Already registered try to login" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const register = await userModel.create({
            name,
            email,
            password: hashPassword,

        })
        await register.save()
        const token = jwt.sign({ id: register._id }, SECRET_KEY)
        return res.json({ success: true, data: register, message: "User registered", token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkuser = await userModel.findOne({ email })
        if (!checkuser) {
            return res.json({ success: false, message: "Email is not register try to register" })
        }
        const comparePassword = await bcrypt.compare(password, checkuser.password)
        if (!comparePassword) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = jwt.sign({ id: checkuser._id }, SECRET_KEY)
        return res.json({ success: true, message: "Login successfull", data: checkuser, token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        if (!users) {
            return res.json({ success: false, message: "No users found" })
        }
        return res.json({ success: true, message: "Users found", data: users })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const findUserById = async (req, res) => {
    try {
        const id = req.user.id; 
        const user = await userModel.findById(id)
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        return res.json({ success: true, message: "user found", data: user })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const userDelete = await userModel.findByIdAndDelete(id)
        if (!userDelete) {
            return res.json({ success: false, message: "user not deleted" })
        }
        return res.json({ success: true, message: "User deleted" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.user.id;
        const update = await userModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!update) {
            return res.json({ success: false, message: "failed to update" })
        }
        return res.json({ success: true, message: "user updated successfully", data: update })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}