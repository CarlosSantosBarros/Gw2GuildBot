module.exports = (sequelize, DataTypes) => {
  return sequelize.define("GuildApplication", {
    applicationId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    snowflake: {
      type: DataTypes.STRING,
    },
    accountName: {
      type: DataTypes.STRING,
    },
    server: {
      type: DataTypes.STRING,
    },
    wvwRank: {
      type: DataTypes.STRING,
    },
    isLegal: {
      type: DataTypes.STRING,
    },
    willRoleSwap: {
      type: DataTypes.STRING,
    },
    personalMessage: {
      type: DataTypes.STRING(2000),
    },
    applicationStatus: {
      type: DataTypes.JSON,
    },
  });
};
