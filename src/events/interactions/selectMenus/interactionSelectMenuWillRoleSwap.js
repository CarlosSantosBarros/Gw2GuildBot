const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const { ServerUtils, getGuild } = require("../../../utils");

module.exports = {
  customId: "willRoleSwap",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    const application = new ClassGuildApplication(interaction.member, server);
    await application.selectWillRoleSwap(interaction);
  },
};
