const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const UserModel = require("./models/modelUser");
exports.User = UserModel(sequelize, DataTypes);
