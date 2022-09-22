const { MemberUtils } = require("../utils");
const { isErrorBadApiKey } = require("../utils/utils");
const { errors } = require("../config.json");
const { isCommand } = require("../utils/utilsTypeGuard");

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    try {
      let collection = interaction.client.slashCommands;
      let key = interaction.commandName;
      if (interaction.isButton()) collection = interaction.client.buttons;
      else if (interaction.isSelectMenu()) collection = interaction.client.selectMenus;
      else if (interaction.isModalSubmit()) collection = interaction.client.modals;
      if (!isCommand(interaction)) key = interaction.customId;

      if (!collection.has(key)) console.log(`Interaction ${interaction.type}`);
      console.log(key);
      await collection.get(key).execute(interaction);

    } catch (error) {
      let errorMsg = error;
      if (typeof error === "object") {
        console.log(error);
        errorMsg = errors.default;
        if (error.content)
          if (isErrorBadApiKey(error.content)) {
            errorMsg = errors.badApiKey;
            const member = new MemberUtils(interaction.member);
            if (member.isVerified()) member.removeVerifiedRole();
          } else errorMsg = error.content.text;
      }
      const reply = {
        content: errorMsg,
        embeds: [],
        components: [],
        ephemeral: true,
      };
      if (interaction.isCommand())
        await interaction.editReply(reply);
      else await interaction.update(reply);
    }
  },
};
