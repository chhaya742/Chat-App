import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log(token);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided."});
        }
        const decoded = jwt.verify(token, "chhayabagwan");
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized- Invaild Token" });
        }
        const user = await User.findById(decoded.userId).select("password");
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }

}
