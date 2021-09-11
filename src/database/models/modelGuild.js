module.exports = (sequelize, DataTypes) => {
  return sequelize.define("DiscordGuild", {
    snowflake: {
      type: DataTypes.UUID,
      unique: true,
    },
    EnabledFeatures: {
      type: DataTypes.JSON,
    },
    GW2ClassClasses: {
      type: DataTypes.JSON,
    },
    GW2ClassOptions: {
      type: DataTypes.JSON,
    },
  });
};
