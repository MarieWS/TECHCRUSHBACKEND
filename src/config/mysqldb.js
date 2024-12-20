import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

let databaseName = process.env.DB_NAME
let username = process.env.DB_USER
let password = process.env.DB_PASS

const database = new Sequelize(databaseName, username, password, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

export const connectMySQL = async () => {
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
    await database.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default database