const { menuGW2Profession } = require("../menus/menuGW2Professions");
const { embedGW2Professions } = require("../embeds/embedGW2Professions");
const DiscordUtils = require("../../utils/utilsDiscord");

exports.controlerGW2Professions = async (interaction, message) => {
  const proficiencyCollection = interaction.client.proficiencyData;
  const memberUtils = new DiscordUtils.MemberUtils(interaction.member);
  const utils = new DiscordUtils.GuildUtils();
  let currentProficiencyValue;
  let currentProficiencyColor;
  let currentProfessionValue;
  if (!memberUtils.getRoleByColor("#000000")) currentProficiencyValue = "main";

  const professionManageCollector = message.createMessageComponentCollector({
    idle: 2000000,
  });

  professionManageCollector.on("collect", async (collected) => {
    // if has main role enable done button
    let professionesMenu;
    if (collected.isSelectMenu()) {
      let actionButton;
      if (collected.customId == "proficiency") {
        currentProficiencyValue = collected.values[0];
        currentProficiencyColor = proficiencyCollection.get(
          currentProficiencyValue
        ).color;
      }
      if (collected.customId == "profession")
        currentProfessionValue = collected.values[0];
      if (currentProfessionValue && currentProficiencyValue) {
        actionButton = "set";
        if (currentProficiencyValue != "main")
          actionButton = memberUtils.getRoleByNameAndColor(
            currentProfessionValue,
            currentProficiencyColor
          )
            ? "remove"
            : "add";
      }
      professionesMenu = await menuGW2Profession({
        selectedProficiencyValue: currentProficiencyValue,
        selectedProfessionValue: currentProfessionValue,
        buttonAction: actionButton,
      });
      await collected.update({ components: professionesMenu });
    }

    /**
     * embed doesnt always change
     * i think its do do with Promisses
     */

    if (collected.isButton()) {
      const currentProfessionRole = utils.getRoleByNameAndColor(
        currentProfessionValue,
        currentProficiencyColor
      );
      if (collected.customId == "set") {
        const roleToRemove = utils.getRoleByColor(currentProficiencyColor);
        await memberUtils.removeRole(roleToRemove.id);
        await memberUtils.addRole(currentProfessionRole.id);
      }
      if (collected.customId == "add")
        await memberUtils.addRole(currentProfessionRole.id);
      if (collected.customId == "remove")
        await memberUtils.removeRole(currentProfessionRole.id);
      if (collected.customId == "done") professionManageCollector.stop();

      const newPlayerprofessionSummary = await embedGW2Professions(
        interaction.member
      );
      professionesMenu = await menuGW2Profession();
      // refactor to one collected.update
      await collected.update({
        components: professionesMenu,
        embeds: [newPlayerprofessionSummary],
      });
    }
  });

  professionManageCollector.on("end", async (collected, reason) => {
    if (reason == "idle")
      interaction.editReply({
        components: [],
        content: "This operation has timed out",
        embeds: [],
      });
    interaction.editReply({
      components: [],
      content: "Done",
      embeds: [],
    });
  });
};
