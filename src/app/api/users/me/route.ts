import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse , NextRequest } from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConfig()

export async function POST(request : NextRequest){
    // extract data from token
     const  userId =   await  getDataFromToken(request)
     const user =  await  User.findOne({_id : userId}).select("-password ")

     if(!user){
         return NextResponse.json(
            {message : "User not found"}
         )
     }

     else {
            return NextResponse.json({
                message : "User found", 
                data : user
            } )
     }
}