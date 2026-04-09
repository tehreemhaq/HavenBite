import mongoose from "mongoose"




async function DBConnection (){
  try{
    const dbConnection = await mongoose.connect(process.env.MONGO_URL)
    console.log(`\n MongoDB connected !! DB HOST: ${dbConnection.connection.host}`)
  }
  catch(error){
    console.log("MongoDB connection Failed ", error )
    process.exit(1)
  }
}



export  {DBConnection}