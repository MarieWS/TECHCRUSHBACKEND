import mysqldb from "../config/mysqldb";
import { DataTypes } from "sequelize";

const User = mysqldb.define(
    'User',
    {
        firstname: {type: DataTypes.STRING, allowNull: false},
        lastname: {type: DataTypes.STRING, allowNull: false},
        username: {type: DataTypes.STRING, allowNull: true},
        phoneNumber: {type: DataTypes.INTEGER, allowNull: false, unique: true},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false}
    },
    {timestamps: true}
)

export default User