module.exports = {
  customId: "done",
  async execute(interaction) {
    interaction.update({ content: "done", embeds: [], components: [] });
  },
};
