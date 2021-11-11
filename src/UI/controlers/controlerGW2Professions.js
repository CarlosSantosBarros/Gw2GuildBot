const { menuGW2Profession } = require("../menus/menuGW2Professions");
const { embedGW2Professions } = require("../embeds/embedGW2Professions");
const DiscordUtils = require("../../utils/utilsDiscord");

exports.controlerGW2Professions = async (interaction, message) => {
  const proficiencyCollection = interaction.client.proficiencyData;
  const professionCollection = interaction.client.professionsData;
  const memberUtils = new DiscordUtils.MemberUtils(interaction.member);
  const utils = new DiscordUtils.GuildUtils();
  let currentProficiencyValue;
  let currentProficiencyColor;
  let currentProfessionValue;

  const professionManageCollector = message.createMessageComponentCollector({
    idle: 60000,
  });

  const availableProfessionsFilter = () => {
    return new Promise((resolve) => {
      const filter = (profession) =>
        currentProficiencyValue === "main"
          ? !memberUtils.getRoleByName(profession.value) ||
            memberUtils.getRoleByNameAndColor(profession.value, "#b45f06")
          : memberUtils.getRoleByNameAndColor(
              profession.value,
              currentProficiencyColor
            );
      const returnObj = professionCollection.filter((profession) =>
        filter(profession)
      );
      resolve(returnObj);
    });
  };

  professionManageCollector.on("collect", async (collected) => {
    // if has main role enable done button
    let professionesMenu = await menuGW2Profession();
    if (collected.isSelectMenu()) {
      let actionButton = null;
      let availableProfessions = null;

      if (collected.customId == "proficiency") {
        currentProfessionValue = null;
        currentProficiencyValue = collected.values[0];
        currentProficiencyColor = proficiencyCollection.get(
          currentProficiencyValue
        ).color;
        const currentProficiency = memberUtils.getRolesByColor(
          currentProficiencyColor
        );
        const maxProficiency = proficiencyCollection.get(
          currentProficiencyValue
        ).professionCap;
        if (currentProficiency.size == maxProficiency)
          availableProfessions = await availableProfessionsFilter();
      }
      if (collected.customId == "profession") {
        currentProfessionValue = collected.values[0];
        actionButton = "set";
        if (currentProficiencyValue !== "main")
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
        availableProfessions: availableProfessions,
      });
    }
    let updateString = { components: professionesMenu };
    if (collected.isButton()) {
      const currentProfessionRole = utils.getRoleByNameAndColor(
        currentProfessionValue,
        currentProficiencyColor
      );
      if (collected.customId == "set") {
        const roleToRemove = memberUtils.getRoleByColor(
          currentProficiencyColor
        );
        if (roleToRemove) await memberUtils.removeRole(roleToRemove.id);
        await memberUtils.addRole(currentProfessionRole.id);
      }
      if (collected.customId == "add")
        await memberUtils.addRole(currentProfessionRole.id);
      if (collected.customId == "remove")
        await memberUtils.removeRole(currentProfessionRole.id);
      if (collected.customId == "done") return professionManageCollector.stop();
      currentProfessionValue = null;
      const professionSummary = await embedGW2Professions(interaction.member);
      updateString = {
        embeds: [professionSummary],
        ...updateString,
      };
    }
    await collected.update(updateString);
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
