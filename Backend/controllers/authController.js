import User from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generaateJWT.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log({ fullName, username, password, confirmPassword, gender })
        if (password !== confirmPassword) {
            return res.status(400).json({error: 'password is not matching '});
        }
        const user = await User.findOne({username});
        if (user) { 
            return res.status(400).json({error: 'User already exists'});
        }
        // hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // profile pic

        const profilePicBoy = "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg";
        const profilePicGirl = "https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg"
        
        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            confirmPassword,
            gender,
            profilePic : gender === "male" ? profilePicBoy : profilePicGirl
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic : newUser.profilePic,
            });
            }
        else {
            res.status(403).json("Invalid  user data")
        }

    } catch (error) {
        res.status(500).json({error: 'internal server error'});
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({username: username});
        const correctPassword = await bcryptjs.compare(password, user?.password || "");

        if (!user || !correctPassword) {
            return res.status(400).json("Invalid Username or password")
        }

        generateToken(user._id, res);

        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
        

    } catch (error) {
        res.status(500).json({error: error});
        console.log(error);
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge: 0});
        res.status(200).json({message: "You have been logged out"});
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}
