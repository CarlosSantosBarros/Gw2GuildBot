const { getDBGW2PlayerById } = require("../../utils/utilsDatabase");
exports.getPlayerClasses = async (userId) => {
  const gw2Player = await getDBGW2PlayerById(userId);
  if (!gw2Player.classes) return [];
  return gw2Player.classes.classes;
};
