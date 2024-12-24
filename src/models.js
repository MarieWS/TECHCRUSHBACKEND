import mysqldb from "./config/mysqldb.js";
import { DataTypes } from "sequelize";

export const User = mysqldb.define(
    'User',
    {
        firstname: {type: DataTypes.STRING, allowNull: false},
        lastname: {type: DataTypes.STRING, allowNull: false},
        username: {type: DataTypes.STRING, allowNull: true},
        phone_number: {type: DataTypes.STRING, allowNull: false, unique: true},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false}
    },
    {timestamps: true}
)
