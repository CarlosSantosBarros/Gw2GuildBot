const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");
const { ServerUtils, getGuild } = require("../../../utils");

module.exports = {
  customId: "proficiency",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    const user = new ClassGW2Profession(interaction.member, server);
    user.selectProficiency(interaction);
  },
};
