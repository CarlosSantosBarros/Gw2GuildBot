const { menuGW2Profession } = require("../../UI/menus/menuGW2Profession");
const { embedGW2Professions } = require("../../UI/embeds/embedGW2Professions");
const DiscordUtils = require("../../utils/utilsDiscord");

exports.buildGw2ClassManager = async (interaction, classManagedMessage) => {
  const memberUtils = new DiscordUtils.MemberUtils(interaction.member);
  const utils = new DiscordUtils.GuildUtils();
  let currentValue;

  const classManageCollector =
    classManagedMessage.createMessageComponentCollector({
      idle: 20000,
    });

  classManageCollector.on("collect", async (collected) => {
    let classesMenu = await menuGW2Profession();
    if (collected.customId == "class") {
      currentValue = collected.values[0];
      const actionButton = memberUtils.getRoleByName(currentValue)
        ? "remove"
        : "add";
      classesMenu = await menuGW2Profession({
        buttonAction: actionButton,
        selectedValue: currentValue,
      });
      currentValue = utils.getRoleByName(currentValue);
      collected.update({ components: classesMenu });
    }

    /**
     * embed doesnt always change
     * i think its do do with Promisses
     */

    if (collected.isButton()) {
      if (collected.customId == "add")
        await memberUtils.addRole(currentValue.id);
      if (collected.customId == "remove")
        await memberUtils.removeRole(currentValue.id);
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
