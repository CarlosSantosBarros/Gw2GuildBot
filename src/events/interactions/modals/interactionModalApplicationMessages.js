const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const { ServerUtils, getGuild } = require("../../../utils");

module.exports = {
  customId: "applicationMessages",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    const application = new ClassGuildApplication(interaction.member, server);
    const applicationNote = interaction.fields.getTextInputValue('applicationNote');
    const applicationReply = interaction.fields.getTextInputValue('applicationReply');
    application.processApplication(interaction, applicationNote, applicationReply);
  }
};