module.exports = (sequelize, DataTypes) => {
  return sequelize.define("GW2Player", {
    snowflake: {
      type: DataTypes.UUID,
      unique: true,
    },
    apikey: {
      type: DataTypes.STRING,
    },
  });
};
