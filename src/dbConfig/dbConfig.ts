import mongoose  from "mongoose";

export async function dbConfig() {
    try {
        mongoose.connect(process.env.MONGO_URI! )

        const connection = mongoose.connection;

        connection.on("connected" , ()=>{
            console.log("Connected to database mongodb");
        }) 

        connection.on("error" ,(error) => {
            console.log("Error in connecting to database", error);
            process.exit();
        } )
    } catch (error) {
        console.log("Error in connecting to database", error);
         
    }
}