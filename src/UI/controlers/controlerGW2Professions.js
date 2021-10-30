const { menuGW2Profession } = require("../menus/menuGW2Professions");
const { embedGW2Professions } = require("../embeds/embedGW2Professions");
const DiscordUtils = require("../../utils/utilsDiscord");

exports.controlerGW2Professions = async (interaction, classManagedMessage) => {
  const memberUtils = new DiscordUtils.MemberUtils(interaction.member);
  const utils = new DiscordUtils.GuildUtils();
  let currentProficiencyValue;
  let currentProfessionValue;
  if (!memberUtils.getRoleByColor("#000000")) currentProficiencyValue = "main";

  const classManageCollector =
    classManagedMessage.createMessageComponentCollector({
      idle: 2000000,
    });

  classManageCollector.on("collect", async (collected) => {
    let classesMenu;
    if (collected.isSelectMenu()) {
      let actionButton;
      if (collected.customId == "proficiency")
        currentProficiencyValue = collected.values[0];
      if (collected.customId == "class")
        currentProfessionValue = collected.values[0];
      if (currentProfessionValue && currentProficiencyValue) {
        actionButton = "set";
        if (currentProficiencyValue != "main")
          actionButton = memberUtils.getRoleByName(currentProfessionValue)
            ? "remove"
            : "add";
      }
      classesMenu = await menuGW2Profession({
        selectedProficiencyValue: currentProficiencyValue,
        selectedProfessionValue: currentProfessionValue,
        buttonAction: actionButton,
      });
      await collected.update({ components: classesMenu });
    }

    /**
     * embed doesnt always change
     * i think its do do with Promisses
     */

    if (collected.isButton()) {
      const currentProfessionRole = utils.getRoleByNameAndColor(
        currentProfessionValue,
        currentProficiencyValue
      );
      if (collected.customId == "set") {
        const roleToRemove = utils.getRoleByColor(currentProficiencyValue);
        await memberUtils.removeRole(roleToRemove.id);
        await memberUtils.addRole(currentProfessionRole.id);
      }
      if (collected.customId == "add")
        await memberUtils.addRole(currentProfessionRole.id);
      if (collected.customId == "remove")
        await memberUtils.removeRole(currentProfessionRole.id);
      if (collected.customId == "done") {
        classesMenu = await menuGW2Profession({
          buttonAction: "done",
          selectedValue: null,
        });
        classManageCollector.stop();
      }
      const newPlayerClassSummary = await embedGW2Professions(
        interaction.member
      );
      await collected.update({
        components: classesMenu,
        embeds: [newPlayerClassSummary],
      });
      console.log("sent message");
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
};
