const {
  ClassGuildApplication,
} = require("../../../classes/ClassGuildApplication");

module.exports = {
  customId: "willRoleSwap",
  async execute(interaction) {
    const willRoleSwap = interaction.values[0];
    const application = new ClassGuildApplication(interaction.member);
    application.selectWillRoleSwap(willRoleSwap);
    application.updateMessage(interaction);
  },
};
