const { log } = require("../utils/utilsDiscord");
const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "./src/database/database.sqlite",
});

(async () => {
  try {
    await this.sequelize.sync();
    await this.sequelize.authenticate();
    log("Connected to database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
