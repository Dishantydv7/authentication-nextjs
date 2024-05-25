import { verify } from "crypto";
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { type } from "os";

const  userSchema = new Schema({
    username :{
        type : String ,
        required : [true , "Hey , username is required"],
        unique : [true , "Hey , username should be unique"],
    } , 
    password :{
        type : String , 
        required : [true , "Hey , password is required"],
    } , 
    isVerified : {
        type : Boolean , 
        default : False ,
    },
    isAdmin :{
        type : Boolean , 
        default : False ,
    },
    forgotPasswordToken : String ,
    forgotPasswordTokenExpiry : Date , 
    verifyToken : String ,
    verifyTokenExpiry : Date ,
})

const User = mongoose.models.users || mongoose.model("User" , userSchema)

export default User
