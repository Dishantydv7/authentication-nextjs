import { dbConfig } from "@/dbConfig/dbConfig";
import { NextResponse , NextRequest } from 'next/server'



dbConfig();



export async function GET(request: NextRequest){
    try {
        const response = NextResponse.json({
            messgae : " Logout Successful",
            success : true , 
        })

        response.cookies.set('tojen' , '' ,{
            httpOnly : true  , 
            expires : new Date(0)
        }  )


        return response
        
        
    } catch (error:any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}