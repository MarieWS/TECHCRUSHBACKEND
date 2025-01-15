import express from "express";
import { config } from "dotenv";
config();
import { connectMySQL } from "./config/mysqldb.js";
import { connectMongoDB } from "./config/mongodb.js";
import router from "./routes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocs = require( "../docs/swagger-output.json");
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: true,  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
    preflightContinue: false,  
    optionsSuccessStatus: 204,
    credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
 
async function startServer(params) {
    await connectMySQL();
    await connectMongoDB()
    
    app.use('/api', router)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}
     
startServer()
