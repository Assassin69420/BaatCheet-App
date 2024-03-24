import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {type: String, required: true},
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true, minlength: 5,},
    confirmPassword : {type: String, required: true},
    gender : {type: String, required: true, enum: ['male','female']},
    profilePic : {type: String, default: ''},
    // createdAt , updatedAt
},{timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;