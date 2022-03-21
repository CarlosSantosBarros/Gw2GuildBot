const StateGuildApplication = require("./state/StateGuildApplication");
const { ServerUtils, MemberUtils } = require("../utils/");
const MenuGuildApplication = require("./menus/menuGuildApplication");
const { GW2Player } = require("./GW2Player");
const { getWorld } = require("../utils/utilsGw2API");
const { accepted, denied, blacklisted } =
  require("../config.json").applicationSettings;

exports.ClassGuildApplication = class extends StateGuildApplication {
  constructor(user) {
    super(user.id);
    this.server = new ServerUtils();
    this.member = this.getMember();
  }

  getMember() {
    const member = this.server.getMemberById(this.userId);
    return new MemberUtils(member);
  }

  async startApplication(member) {
    const player = new GW2Player(member);
    await player.init();
    const accountData = player.getApplicationData();
    const serverInfo = await getWorld(accountData.application.server);
    this.setAccountData(accountData, serverInfo);
  }

  async submit() {
    const menu = new MenuGuildApplication(this.member, this.state);
    const embeds = menu.getEmbeds();
    const appChan = this.server.getApplicationChan();
    const msg = await appChan.send({ embeds: embeds });

    const app = this.getAppState();
    this.selectApplication(msg.id);
    await this.create();
    await this.update(app);
    this.removeAppState(this.userId);
  }

  async addReason(message) {
    this.getAppStatus();
    if (!this.state) return await message.delete();
    this.setApplicationReason(message.content);
  }

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

  async accept(message, user) {
    const reason = await this.processApplication(message, accepted.dbMessage);
    await this.updateStatus("Accepted", reason, user.username);
    this.state = await this.getApplication();
  }

  async deny(message, user) {
    const reason = await this.processApplication(message, denied.dbMessage);
    await this.updateStatus("Denied", reason, user.username);
    this.state = await this.getApplication();
  }

  async blackList(message, user) {
    const reason = await this.processApplication(
      message,
      blacklisted.dbMessage
    );
    await this.updateStatus("Blacklisted", reason, user.username);
    this.state = await this.getApplication();
  }

  async updateMessage(message) {
    const menu = new MenuGuildApplication(this.member, this.state);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();
    if (message.emoji) {
      // refactor - this is probs bad, message.message?
      const appMessage = await message.message.channel.messages.fetch(
        this.state.applicationId
      );
      await appMessage.reactions.removeAll();
      await appMessage.edit({ embeds: embeds });
    } else if (message.isSelectMenu())
      await message.update({ components: components, embeds: embeds });
    else if (message.isApplicationCommand())
      await message.editReply({
        content: "Please select the approriate answers and click continue",
        components: components,
        embeds: embeds,
      });
  }

  async notify() {
    const server = new ServerUtils();
    const member = server.getMemberById(this.state.snowflake);
    let replyMessage;
    if (this.state.applicationStatus) {
      const status = this.state.applicationStatus;
      switch (status.status) {
        case "Denied":
          replyMessage = denied.dmMessage;
          break;
        case "Blacklisted":
          replyMessage = blacklisted.dmMessage;
          break;
        default:
          replyMessage = accepted.dmMessage;
          break;
      }
    }
    member.send({ content: replyMessage });
  }
};
