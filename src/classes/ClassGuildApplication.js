const { client } = require("../index");

module.exports = class ClassGuildApplication {
  constructor(user) {
    this.userId = user.id;
    this.state = client.guildAppState.get(this.userId);
  }

  meetsRequirement(value) {
    if (value == "No")
      throw {
        content: {
          text: `Unfortunately this is a requirement to join the guild.
Failure to meet this criteria means you have been unsuccessful in your application.
Feel free to reapply if/when the circumstances change`,
        },
      };
  }

  selectIsLegal(value) {
    this.meetsRequirement(value);
    client.guildAppState.set(this.userId, {
      ...this.state,
      isLegal: value,
    });
  }

  selectWillRoleSwap(value) {
    this.meetsRequirement(value);
    client.guildAppState.set(this.userId, {
      ...this.state,
      willRoleSwap: value,
    });
  }

  async setHasDoneProfs(interaction) {
    client.guildAppState.set(this.userId, {
      ...this.state,
      hasDoneProfs: true,
    });
    await interaction.followUp({
      content: "You will shortly receive a Message from me...",
      ephemeral: true,
    });
    interaction.member.send({
      content: `For the last part of your application, tell us anything about yourself you want us to know.
(play style, experience, what you are looking for from the guild, irl info or anything else).`,
    });
  }
  hasDoneProfs() {
    if (!this.state) return false;
    return this.state.hasDoneProfs;
  }
  setPersonalMessage(message) {
    client.guildAppState.set(this.userId, {
      ...this.state,
      personalMessage: message,
    });
  }
};
