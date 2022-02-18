const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");

module.exports = {
  name: "DM",
  async execute(message) {
    if (!message.author.bot) {
      const application = new ClassGuildApplication(message.author);
      if (application.hasDoneProfs()) {
        application.setPersonalMessage(message.content);
        application.submit();
      }
    }
  },
};
