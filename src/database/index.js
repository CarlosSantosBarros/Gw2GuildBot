const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./modelUser");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

exports.User = UserModel(sequelize, DataTypes);
