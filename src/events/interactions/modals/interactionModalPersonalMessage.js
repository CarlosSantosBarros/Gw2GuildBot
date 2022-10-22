const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const { ServerUtils, getGuild } = require("../../../utils");

module.exports = {
  customId: "personalMessage",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    const application = new ClassGuildApplication(interaction.member, server);
    const message = interaction.fields.getTextInputValue('messageInput');
    application.writePersonalMessage(message);
    application.submit();
    await interaction.update({
      content: 'Your submission was received successfully! An Officer will be reviewing it as soon as possible',
      components: [],
      embeds: [],
    });
  },
};