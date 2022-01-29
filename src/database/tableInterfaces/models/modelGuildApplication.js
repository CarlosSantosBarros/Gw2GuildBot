module.exports = (sequelize, DataTypes) => {
  return sequelize.define("GuildApplication", {
    applicationId: {
      type: DataTypes.UUID,
      unique: true,
    },
    snowflake: {
      type: DataTypes.STRING,
    },
    accountName: {
      type: DataTypes.STRING,
    },
    application: {
      type: DataTypes.JSON,
    },
    applicationStatus: {
      type: DataTypes.JSON,
    },
  });
};
