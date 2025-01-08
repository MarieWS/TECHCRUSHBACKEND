import express from "express";
import { config } from "dotenv";
config();
import { connectMySQL } from "./config/mysqldb.js";
import router from "./routes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocs = require( "../docs/swagger-output.json");
import cors from "cors";
import { connectMongoDB } from "./config/mongodb.js";

const app = express();

const corsOptions = {
    // origin: true,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
 
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