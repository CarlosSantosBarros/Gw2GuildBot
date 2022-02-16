const StateGuildApplication = require("./state/StateGuildApplication");
const { ServerUtils, MemberUtils } = require("../utils/");
const MenuGuildApplication = require("./menus/menuGuildApplication");

exports.ClassGuildApplication = class extends StateGuildApplication {
  constructor(user) {
    super(user.id);
    this.member = this.getMember();
  }
  getMember() {
    const server = new ServerUtils();
    const member = server.getMemberById(this.userId);
    return new MemberUtils(member);
  }

  async submit(msgId) {
    const app = this.getAppState();
    this.selectApplication(msgId);
    await this.create();
    await this.update(app);
    this.removeAppState(this.userId);
  }

  async addReason(message) {
    this.getAppStatus();
    if (!this.state) return await message.delete();
    this.setApplicationReason(message.content);
  }

  // refactor - config value for default messages
  async processApplication(message, reason) {
    const app = await this.getAppStatus();
    let appId = message.id;
    if (app) {
      appId = app.appId;
      reason = app.applicationStatus.reason;
      await message.delete();
    }
    this.selectApplication(appId);
    this.removeAppStatus(this.userId);
    return reason;
  }

  async accept(message) {
    const reason = await this.processApplication(message, "Met requirements");
    return await this.updateStatus("accepted", reason);
  }

  async deny(message) {
    const reason = await this.processApplication(message, "Nope");
    return await this.updateStatus("denied", reason);
  }

  async blackList(message) {
    const reason = await this.processApplication(message, "HELL NO");
    return await this.updateStatus("blacklisted", reason);
  }

  async updateMessage(message) {
    this.state = await this.getApplication();
    const menu = new MenuGuildApplication(this.member, this.state);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();
    // If statement to filter what kinda of change needs to be done
    if (message.emoji) {
      const appMessage = await message.message.channel.messages.fetch(
        this.state.applicationId
      );
      await appMessage.edit({ embeds: embeds });
    } else if (message.isSelectMenu())
      await message.update({ components: components, embeds: embeds });
  }

  async notify() {
    const server = new ServerUtils();
    const member = server.getMemberById(this.state.snowflake);
    let replyMessage;
    if (this.state.applicationStatus) {
      const status = this.state.applicationStatus;
      // refactor - move these a config file
      switch (status.status) {
        case "accepted":
          replyMessage =
            "Your have been successfull in your application, please check ingame for a guild invitation";
          break;
        case "denied":
          replyMessage =
            "Unfortunatly you have been unsuccessfull in your application, please try againt in the future";
          break;
        case "blacklisted":
          replyMessage = "You gone done fucked up, dont bother trying again";
          break;

        default:
          break;
      }
    }
    // member.send({ content: this.state.applicationStatus.reason });
    member.send({ content: replyMessage });
  }
};
