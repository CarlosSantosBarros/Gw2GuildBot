const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.log,
  // SQLite only
  storage: "./src/bot/classes/database/database.sqlite",
});

(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Connected to database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

exports.ModelGW2Player = require("./modelGW2Player")(sequelize, DataTypes);
exports.ModelGuildApplication = require("./modelGuildApplication")(
  sequelize,
  DataTypes
);
