import userModel from "../model/userModel.js"

export const createUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body
        const register = await userModel.create({
            name,
            email,
            password,
            age
        })
        await register.save()
        return res.json({ success: true, data: register, message: "User registered" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        if (!users) {
            return res.json({success:false, message:"No users found"})
        }
        return res.json({success:true, message:"Users found", data:users})
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}