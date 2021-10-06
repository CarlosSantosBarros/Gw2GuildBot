const {
  buildClassManageMenu,
  buildPlayerClassSummary,
} = require("./componentsGW2Class");
const { removeFromArray } = require("../../utils/utils");
const { getPlayerClasses } = require("./functionsGW2Class");
const { getRoleByName } = require("../../utils/utilsDiscord");
const {
  updateDBGW2PlayerById,
} = require("../../database/tableInterfaces/tableInterfaceGW2Player");

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
    let classesMenu = buildClassManageMenu();
    const userMember = interaction.member;
    const guildRoles = interaction.guild.roles;
    let currentValue;
    // let classesArray = await getPlayerClasses(interaction.user.id);

    const playerClassSummary = buildPlayerClassSummary(userMember);
    const classManagedMessage = await interaction.reply({
      ephemeral: true,
      components: classesMenu,
      embeds: [playerClassSummary],
      fetchReply: true,
    });
    // * Extract this to be reusable
    // * Start
    const classManageCollector =
      classManagedMessage.channel.createMessageComponentCollector({
        idle: 5000,
      });

    classManageCollector.on("collect", async (collected) => {
      classesMenu = buildClassManageMenu();
      if (collected.customId == "class") {
        currentValue = collected.values[0];
        const actionButton = getRoleByName(userMember.roles, currentValue)
          ? "remove"
          : "add";
        classesMenu = buildClassManageMenu({
          button: actionButton,
          select: currentValue,
        });
        currentValue = getRoleByName(guildRoles, currentValue);
      }

      if (collected.customId == "add") {
        classesMenu = buildClassManageMenu();
        await userMember.roles.add(currentValue.id);
      }
      if (collected.customId == "remove") {
        classesMenu = buildClassManageMenu();
        await userMember.roles.remove(currentValue.id);
      }
      if (collected.customId == "done") {
        classesMenu = buildClassManageMenu({
          button: "done",
          select: null,
        });
        classManageCollector.stop();
      }
      const newPlayerClassSummary = buildPlayerClassSummary(userMember);
      collected.update({
        components: classesMenu,
        embeds: [newPlayerClassSummary],
      });
    });
    classManageCollector.on("end", async (collected, reason) => {
      if (reason == "idle")
        interaction.editReply({
          components: [],
          content: "This operation has timed out",
          embeds: [],
        });
    });
    //* End
  },
};
