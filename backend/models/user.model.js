import mongoose from 'mongoose';
const userSchema=new  mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minilenght:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});
const User=mongoose.model("User",userSchema,"User");
export default User ;