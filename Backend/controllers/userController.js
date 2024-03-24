import User from "../models/userModel.js";

export const getUserForSideBar = async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: {$ne: loggedInUserId}});

        res.status(200).json({allUsers})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}