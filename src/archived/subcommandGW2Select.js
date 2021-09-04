const subConfig = {
  name: "select",
  decription: "Select Key",
};
const configure = (subCommandObj) => {
  return subCommandObj
    .setName(subConfig.name)
    .setDescription(subConfig.decription);
};

module.exports = {
  config: subConfig,
  configure: configure,
  async execute(interaction) {
    interaction.reply({
      content: "Select stuff here",
      ephemeral: true,
    });
  },
};
