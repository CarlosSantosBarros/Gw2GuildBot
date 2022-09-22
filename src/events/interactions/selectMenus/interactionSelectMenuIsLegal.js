const ClassGuildApplication = require("../../../classes/ClassGuildApplication");

module.exports = {
  customId: "isLegal",
  async execute(interaction) {
    const application = new ClassGuildApplication(interaction.member);
    application.selectIsLegal(interaction);
  },
};
