import jwt from "jsonwebtoken"
const SECRET_KEY = "expressbackend"

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(403).json({ success: false, message: "Token not found" })
        }
        const decode = jwt.verify(token, SECRET_KEY)
        req.user = decode;
        next()


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}