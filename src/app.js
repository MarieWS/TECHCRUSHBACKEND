import express from "express";
import { config } from "dotenv";
config();
import { connectMySQL } from "./config/mysqldb.js";
import router from "./routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

async function startServer(params) {
    await connectMySQL();
    
    app.use('/api', router)

    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}

startServer()