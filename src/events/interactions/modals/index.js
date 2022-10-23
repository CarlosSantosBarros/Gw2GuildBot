const { fileLoader } = require("../../../utils");

module.exports = async (client) => {
  // client.modals = new Discord.Collection();

  // const loadSelectMenu = (fileItem) => {
  //   const modal = require(`./${fileItem}`);
  //   log(`Loading: ${modal.customId}`);
  //   client.modals.set(modal.customId, modal);
  // };
  // findJSStartingWith_In_AndDo_("interactionModal", __dirname, loadSelectMenu);
  // log("Modals loaded");

  const config = {
    prefix: "interactionModal",
    dirPath: __dirname,
  };

  client.modals = fileLoader(config);
};