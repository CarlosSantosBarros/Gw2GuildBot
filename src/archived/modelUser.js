module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    snowflake: {
      type: DataTypes.UUID,
      unique: true,
    },
  });
};
