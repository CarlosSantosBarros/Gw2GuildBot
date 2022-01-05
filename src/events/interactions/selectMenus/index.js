const Discord = require("discord.js");
const { log, findJSStartingWith_In_AndDo_ } = require("../../../utils/utils");

module.exports = async (client) => {
  client.selectMenus = new Discord.Collection();

  const loadSelectMenu = (fileItem) => {
    const selectMenu = require(`./${fileItem}`);
    log(`Loading: ${selectMenu.customId}`);
    client.selectMenus.set(selectMenu.customId, selectMenu);
  };
  findJSStartingWith_In_AndDo_(
    "interactionSelectMenu",
    __dirname,
    loadSelectMenu
  );
  log("Select Menus loaded");
};
