const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");

module.exports = {
  customId: "done",
  async execute(interaction) {
    const user = new ClassGW2Profession(interaction.member);
    user.finishSelection();
    interaction.update({ content: "done", embeds: [], components: [] });
  },
};
