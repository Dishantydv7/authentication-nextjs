import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse , NextRequest } from 'next/server'


dbConfig();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()

        const { token } = reqBody;
        console.log(reqBody, token);

        const user = User.findOne({ verifyToken: token }, { verifyTokenExpiry: { $gt: Date.now() } }) as User;
    
        if (!user) {
            return NextResponse.json({
                error: "Invalid token details",
                status: 400,
            });
        }

        user.isVerified = true;
        user.verifyToken = undefined;

        await user.save();

        return NextResponse.json({
            message : "Email verified successfully",
            success : true ,

        })

        
    } catch (error: any) {
        return NextResponse.json({
            error : error.message , 
            status : 500
        })
    }
}