const { client } = require("../index");

module.exports = class ClassGuildApplication {
  constructor(member) {
    this.userId = member.user.id;
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
};
