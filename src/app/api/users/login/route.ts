import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse , NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


dbConfig();


export async function POST(request : NextRequest){
    try {
       const reqBody = await request.json()

        const { email , password } = reqBody;
        console.log(reqBody, email, password);

       const user =  await User.findOne({email})

       if (!user) {
           return NextResponse.json({
               error: "Invalid email",
               status: 400,
           });
       }


         const validPassword = await bcryptjs.compare(password, user.password)

         if (!validPassword) {
            return NextResponse.json({
                error: "Check your credentials",
                status: 400,
            });
         }

        const tokenData = {
            id : user._id , 
            username : user.username , 
            email : user.email
        }


        const secretKey = process.env.SECRET_KEY

        // if (!secretKey) {
        //     return NextResponse.json({
        //         message : "Secret key not found",
        //     })
        // }
            const Token = await jwt.sign( tokenData , secretKey! , { expiresIn : '1h'} )


            
       const response =  NextResponse.json({
            message : "Login Successful" , 
            success : true
        })

        response.cookies.set("token" , Token , {
            httpOnly : true 
        })
        return response
        
        
    } catch ( error: any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}