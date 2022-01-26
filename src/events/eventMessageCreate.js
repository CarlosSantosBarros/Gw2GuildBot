const ClassGuildApplication = require("../classes/ClassGuildApplication");
const MenuGuildApplication = require("../menus/menuGuildApplication");
const { ServerUtils } = require("../utils");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (!message.author.bot) {
      const application = new ClassGuildApplication(message.author);
      if (application.hasDoneProfs() && message.channel.type === "DM") {
        application.setPersonalMessage(message.content);
        const member = server.getMemberById(message.author.id);
        const menu = new MenuGuildApplication(member);
        const embeds = menu.getEmbeds();
        appChan.send({ embeds: embeds });
      }
    } else if (message.channel == appChan) message.react("👍");
  },
};
