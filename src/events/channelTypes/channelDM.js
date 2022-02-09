const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../menus/menuGuildApplication");

module.exports = {
  name: "DM",
  async execute(message) {
    if (!message.author.bot) {
      const application = new ClassGuildApplication(message.author);
      if (application.hasDoneProfs()) {
        const state = application.setPersonalMessage(message.content);

        const server = new ServerUtils();
        const member = server.getMemberById(message.author.id);
        const menu = new MenuGuildApplication(member, state);
        const embeds = menu.getEmbeds();

        const appChan = server.getApplicationChan();
        const msg = await appChan.send({ embeds: embeds });
        application.submit(msg.id);
      }
    }
  },
};
