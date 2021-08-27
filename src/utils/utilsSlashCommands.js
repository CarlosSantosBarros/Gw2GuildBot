const { SlashCommandBuilder } = require("@discordjs/builders");
const { findJSStartingWith_In_AndDo_ } = require("./utils");
const { log } = require("./utilsDiscord");

exports.createCommandData = (config) => {
  const { subfolder, name, description, subCommandCollection } = config;
  const commandObj = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

  const loadSubcommands = (fileItem) => {
    const subCom = require(subfolder + fileItem);
    commandObj.addSubcommand((subcommand) => subCom.configure(subcommand));
    subCommandCollection.set(subCom.config.name, subCom);
    log("'---------" + subCom.config.name);
  };
  findJSStartingWith_In_AndDo_("sub", subfolder, loadSubcommands);
  return commandObj;
};
