import bycript from "bcryptjs";
import User from '../models/user.model.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'
export const signupUser = async (req, res) => {

    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password does not match" });
        }
        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "User alreay exists" })
        }
        //     //HASH Password 
        const salt = await bycript.genSalt(10);
        const bycriptPassword = await bycript.hash(password, salt);
        //     //https://avatar-placeholder.iran.liara.run/document
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: bycriptPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        if (newUser) {
            //generat jwt token 
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser.fullName,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid User Data" })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bycript.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invailid Credential" })
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(201).json({
            _id: user.fullName,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logout out successfully"});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });

    }
}