const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = class ModalPersonalMessage extends ModalBuilder {
  constructor(user) {
    super();
    this.setCustomId("personalMessage");
    this.setTitle(`${user.username}`);
    const messageInput = new TextInputBuilder()
      .setCustomId("messageInput")
      .setLabel("Tell us about yourself.")
      .setPlaceholder('Play style, experience, what you are looking for from the guild, irl info or anything else')
      .setStyle(TextInputStyle.Paragraph);
    const actionRow = new ActionRowBuilder().addComponents(messageInput);
    this.addComponents(actionRow);
  }
};
