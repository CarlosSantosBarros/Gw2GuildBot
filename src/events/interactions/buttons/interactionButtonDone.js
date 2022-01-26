const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");
const { MemberUtils } = require("../../../utils");

module.exports = {
  customId: "done",
  async execute(interaction) {
    const user = new ClassGW2Profession(interaction.member);
    user.finishSelection();
    await interaction.update({
      content: "Finished Profession selection...",
      embeds: [],
      components: [],
      ephemeral: true,
    });
    const member = new MemberUtils(interaction.member);
    if (member.isMember()) return;

    const application = new ClassGuildApplication(interaction.member.user);
    await application.setHasDoneProfs(interaction);
  },
};
