const { log } = require("../../../utils/utils");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.log,
  // SQLite only
  storage: "./src/database/database.sqlite",
});

(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    log("Connected to database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

exports.ModelGW2Player = require("./modelGW2Player")(sequelize, DataTypes);
// exports.ModelUser = require("./modelUser")(sequelize, DataTypes);
// exports.ModelDiscordGuild = require("./modelGuild")(sequelize, DataTypes);
