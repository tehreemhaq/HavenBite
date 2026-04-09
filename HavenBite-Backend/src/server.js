import 'dotenv/config';
import { app } from './app.js';
import { DBConnection } from "./config/dbConnection.js";
const port = process.env.PORT || 8000;

 
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! Shutting down...")
    console.error(err)
    process.exit(1)
})


let server;

async function startServer() {
    try {
        await DBConnection();
        server = app.listen(port, () => {
            console.log(`server is listening at ${port}`)
        })
    } catch (err) {
        console.log("Failed to start server", err)
        process.exit(1)
    }

}


startServer()





process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! Shutting down...")
    console.error(err)
    server.close(() => {
        process.exit(1)
    })
})




// ---- Sequence of layer 3 error handling Reason ----------

// the reason to put uncaughtException handler before starting server is : so , it can caught and log error in booting (if any)
// and to put unhandledRejection after starting server is : because the job of the handler is to caught unhandled rejection from promise(if any) and 
// it can only happen if the server is already working and then if any unhandled rejection occurs this handler will caught it