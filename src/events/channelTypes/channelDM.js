const { ServerUtils } = require("../../utils");
const ClassGuildApplication = require("../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../menus/menuGuildApplication");
const { InterfaceGuildApplication } = require("../../database/");
const { client } = require("../../index");

module.exports = {
  name: "DM",
  async execute(message) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (!message.author.bot) {
      const application = new ClassGuildApplication(message.author);
      if (application.hasDoneProfs()) {
        application.setPersonalMessage(message.content);
        const member = server.getMemberById(message.author.id);
        const menu = new MenuGuildApplication(member);
        const embeds = menu.getEmbeds();
        const msg = await appChan.send({ embeds: embeds });
        console.log(msg.id);
        const dbApp = new InterfaceGuildApplication();
        const thisApp = await client.guildAppState.get(message.author.id);
        console.log({ applicationId: msg.id, ...thisApp });
        dbApp.setSelector({ where: { applicationId: msg.id } });
        await dbApp.create();
        dbApp.update(thisApp);
      }
    }
  },
};