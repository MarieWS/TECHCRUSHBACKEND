import express from "express";
import { config } from "dotenv";
config();
import { connectMySQL } from "./config/mysqldb.js";

const app = express();

async function startServer(params) {
    await connectMySQL();
}

startServer()