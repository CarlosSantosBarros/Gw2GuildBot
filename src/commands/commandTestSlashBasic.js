module.exports = {
  name: "slash",
  description: "Test slash",
  args: [],
  usage: "<comand>",

  async execute(interaction) {
    const replyObj = {
      content: "you have slashed!",
      ephemeral: true,
    };
    interaction.reply(replyObj);
    const channel = interaction.channel;
    const thread = await channel.threads.create({
      name: "slash test",
      autoArchiveDuration: 60,
    });
    await thread.members.add(interaction.user);
  },
};
