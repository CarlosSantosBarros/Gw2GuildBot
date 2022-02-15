const {
  ClassGuildApplication,
} = require("../../../classes/ClassGuildApplication");

module.exports = {
  customId: "isLegal",
  async execute(interaction) {
    const isLegal = interaction.values[0];
    const application = new ClassGuildApplication(interaction.member);
    application.selectIsLegal(isLegal);
    application.updateMessage(interaction);
  },
};
