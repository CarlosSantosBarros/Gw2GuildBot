const {
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");

exports.selectMenu = [
  new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("select1")
      .setPlaceholder("First select")
      .addOptions([
        {
          label: "Select me1.1",
          description: "This is a description",
          value: "first_option1",
        },
        {
          label: "You can select me too1.2",
          description: "This is also a description",
          value: "second_option1",
        },
      ])
  ),
  new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("select2")
      .setPlaceholder("second select")
      .addOptions([
        {
          label: "Select me2.1",
          description: "This is a description",
          value: "first_option2",
        },
        {
          label: "You can select me too2.2",
          description: "This is also a description",
          value: "second_option2",
        },
      ])
  ),
  new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("primary")
      .setLabel("Primary")
      .setStyle("PRIMARY")
  ),
];
