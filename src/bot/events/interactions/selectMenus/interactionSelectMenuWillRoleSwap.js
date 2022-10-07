const ClassGuildApplication = require("../../../classes/ClassGuildApplication");

module.exports = {
  customId: "willRoleSwap",
  async execute(interaction) {
    const application = new ClassGuildApplication(interaction.member);
    application.selectWillRoleSwap(interaction);
  },
};
