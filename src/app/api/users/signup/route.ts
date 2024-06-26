import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse , NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

dbConfig()

export async function POST(request : NextRequest){
    try {

      
       const reqBody =  await request.json()
       const {username , email , password} =  reqBody

       console.log(reqBody);

      const user =  await User.findOne({email})

      if (user) {
        return NextResponse.json({error : "User already exists"} , {status : 400})
      }
      
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword  = await bcryptjs.hash(password , salt )

     const newUser  = new User({
        username : username,
        email : email,
        password : hashedPassword,
      })
      const savedUser  =  await newUser.save()
      console.log(savedUser);

      await sendEmail({email ,emailType :  "VERIFY" , userId :  savedUser._id })
      
       return NextResponse.json({
        message : "User registered successfully",
        user : savedUser , 
        success : true ,
       })
        
    } catch (error : any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}