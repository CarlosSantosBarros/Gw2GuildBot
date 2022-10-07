module.exports = (sequelize, DataTypes) => {
  return sequelize.define("GW2Player", {
    snowflake: {
      type: DataTypes.STRING,
      unique: true,
    },
    apiKey: {
      type: DataTypes.STRING,
    },
    accountName: {
      type: DataTypes.STRING,
    },
  });
};
