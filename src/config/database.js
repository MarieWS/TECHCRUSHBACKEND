import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

let database 
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });