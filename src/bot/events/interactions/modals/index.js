const Discord = require("discord.js");
const { log, findJSStartingWith_In_AndDo_ } = require("../../../utils/utils");

module.exports = async (client) => {
  client.modals = new Discord.Collection();

  const loadSelectMenu = (fileItem) => {
    const modal = require(`./${fileItem}`);
    log(`Loading: ${modal.customId}`);
    client.modals.set(modal.customId, modal);
  };
  findJSStartingWith_In_AndDo_("interactionModal", __dirname, loadSelectMenu);
  log("Modals loaded");
};