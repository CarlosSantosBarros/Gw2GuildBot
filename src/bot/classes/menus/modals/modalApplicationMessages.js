const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = class ModalApplicationMessages extends ModalBuilder {
  constructor(user, defaultMessage) {
    super();
    this.setCustomId("applicationMessages");
    this.setTitle(`${user.username}`);

    const applicationNote = new TextInputBuilder()
      .setCustomId("applicationNote")
      .setLabel("Notes about application")
      .setStyle(TextInputStyle.Paragraph)
      .setValue(defaultMessage.dbMessage);
    const applicationNoteActionRow = new ActionRowBuilder().addComponents(applicationNote);

    const applicationReply = new TextInputBuilder()
      .setCustomId("applicationReply")
      .setLabel("Reply to application")
      .setStyle(TextInputStyle.Paragraph)
      .setValue(defaultMessage.dmMessage);
    const applicationReplyActionRow = new ActionRowBuilder().addComponents(applicationReply);

    this.addComponents(applicationNoteActionRow, applicationReplyActionRow);
  }
};