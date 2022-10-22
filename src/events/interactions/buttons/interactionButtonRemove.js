const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");
const { ServerUtils, getGuild } = require("../../../utils");

module.exports = {
  customId: "remove",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    const user = new ClassGW2Profession(interaction.member, server);
    await user.removeProfession();
    user.updateMessage(interaction);
  },
};
