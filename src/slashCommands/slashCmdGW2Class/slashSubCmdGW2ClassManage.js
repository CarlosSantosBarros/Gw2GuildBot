const { buildGw2ClassManager } = require("./componentsGW2Class");
const subConfig = {
  name: "manage",
  decription: "Add/Remove Classes that you play",
};

const configure = (subCommandObj) => {
  return subCommandObj
    .setName(subConfig.name)
    .setDescription(subConfig.decription);
};

module.exports = {
  config: subConfig,
  configure: configure,
  async execute(interaction) {
    const playerClassSummary = this.buildPlayerClassSummary(interaction.member);
    const classesMenu = this.buildClassManageMenu();
    const classManagedMessage = await interaction.reply({
      ephemeral: true,
      components: classesMenu,
      embeds: [playerClassSummary],
      fetchReply: true,
    });
    buildGw2ClassManager(interaction, classManagedMessage);
  },
};
