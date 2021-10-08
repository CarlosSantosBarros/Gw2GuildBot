const Discord = require("discord.js");
const { createCommandData } = require("../utils/utilsSlashCommands");
const path = require("path");

const subpath = path.join(__dirname, "./slashCmdGW2Class/");
const subCollection = new Discord.Collection();
const commandConfig = {
  subfolder: subpath,
  name: "gw2class",
  description: "Guildwars 2 class commands",
  subCommandCollection: subCollection,
};

const commandData = createCommandData(commandConfig);

module.exports = {
  data: commandData,
  guildCommand: true,
  async execute(interaction) {
    await subCollection
      .get(interaction.options.getSubcommand())
      .execute(interaction);
  },
};
