const ClassGuildApplication = require("../../../classes/ClassGuildApplication");

module.exports = {
  customId: "personalMessage",
  async execute(interaction) {
    const application = new ClassGuildApplication(interaction.member);
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