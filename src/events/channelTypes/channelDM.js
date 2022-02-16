const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../classes/menus/menuGuildApplication");

module.exports = {
  name: "DM",
  async execute(message) {
    if (!message.author.bot) {
      const server = new ServerUtils();
      const member = server.getMemberById(message.author.id);
      const application = new ClassGuildApplication(member);
      if (application.hasDoneProfs()) {
        const state = application.setPersonalMessage(message.content);

        // refactor - something can be done here, maybe move the sending of the message to submit()
        const menu = new MenuGuildApplication(member, state);
        const embeds = menu.getEmbeds();

        const appChan = server.getApplicationChan();
        const msg = await appChan.send({ embeds: embeds });
        application.submit(msg.id);
      }
    }
  },
};
