const ClassGuildApplication = require("../../../classes/ClassGuildApplication");

module.exports = {
  customId: "applicationMessages",
  async execute(interaction) {
    const application = new ClassGuildApplication(interaction.member);
    const applicationNote = interaction.fields.getTextInputValue('applicationNote');
    const applicationReply = interaction.fields.getTextInputValue('applicationReply');
    application.processApplication(interaction, applicationNote, applicationReply);
  }
};