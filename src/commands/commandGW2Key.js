const Discord = require("discord.js");
const { createCommandData } = require("../utils/utilsSlashCommands");
const path = require("path");

const subpath = path.join(__dirname, "./commandGW2Key/");
const subCollection = new Discord.Collection();
const commandConfig = {
  subfolder: subpath,
  name: "gw2key",
  description: "Guildwars 2 API key commands",
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
