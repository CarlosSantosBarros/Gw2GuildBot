const {
  buildClassManageMenu,
  buildPlayerClassSummary,
} = require("./componentsGW2Class");
const { getRoleByName } = require("../../utils/utilsDiscord");

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
        idle: 20000,
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
        collected.update({ components: classesMenu });
      }

      if (collected.isButton()) {
        if (collected.customId == "add")
          await userMember.roles.add(currentValue.id);
        if (collected.customId == "remove")
          await userMember.roles.remove(currentValue.id);
        if (collected.customId == "done") {
          classesMenu = buildClassManageMenu({
            button: "done",
            select: null,
          });
          classManageCollector.stop();
        }
        const newPlayerClassSummary = await buildPlayerClassSummary(userMember);
        await collected.update({
          components: classesMenu,
          embeds: [newPlayerClassSummary],
        });
      }
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
