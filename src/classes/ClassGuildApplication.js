// eslint-disable-next-line no-unused-vars
const { User } = require("discord.js");
const StateGuildApplication = require("./state/StateGuildApplication");
const { ServerUtils, MemberUtils } = require("../utils/");
const MenuGuildApplication = require("./menus/menuGuildApplication");
const { GW2Player } = require("./GW2Player");
const { getWorld } = require("../utils/utilsGw2API");
const { getGuild } = require("../utils/utils");
const { InterfaceGuildApplication } = require("./database");
const { isCommand } = require("../utils/utilsTypeGuard");

module.exports = class ClassGuildApplication {
  /**
   * @param {User} user
   */
  constructor(user) {
    this.server = new ServerUtils(getGuild(user.client));
    this.state = new StateGuildApplication(user);
    this.db = new InterfaceGuildApplication();
    this.userId = user.id;
    this.member;
  }

  getMember() {
    const member = this.server.getMemberById(this.userId);
    this.member = new MemberUtils(member);
  }

  async startApplication(interaction) {
    const player = new GW2Player(interaction.member);
    const accountData = await player.getApplicationData();
    const serverInfo = await getWorld(accountData.application.server);
    const newState = this.state.setAccountData(accountData, serverInfo);
    this.updateMessage(interaction, newState);
  }

  selectIsLegal(interaction) {
    const newState = this.state.setIsLegal(interaction.values[0]);
    this.updateMessage(interaction, newState);
  }

  selectWillRoleSwap(interaction) {
    const newState = this.state.setWillRoleSwap(interaction.values[0]);
    this.updateMessage(interaction, newState);
  }

  async writePersonalMessage(message) { this.state.setPersonalMessage(message); }

  async submit() {
    this.getMember();
    const state = this.state.getState(this.userId);
    const menu = new MenuGuildApplication(this.member, state);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();
    const appChan = this.server.getApplicationChan();
    // @ts-ignore
    const msg = await appChan.send({ components: components, embeds: embeds });

    this.db.selectApplication(msg.id);
    await this.db.create();
    await this.db.update(state);
    await this.db.updateStatus({ status: "Pending" });
    this.state.deleteState(this.userId);
  }

  async processApplication(interaction, reason, dmReply) {
    const appId = interaction.message.id;
    this.state.setApplicationReason(reason, appId);
    this.db.selectApplication(appId);
    const appStatus = this.state.getApplicationStatus(appId);
    console.log(appStatus.status);
    await this.db.updateStatus(appStatus);
    const application = await this.db.getApplication();
    const member = this.server.getMemberById(application.snowflake);
    await member.send({ content: dmReply });
    const memberUtils = new MemberUtils(member);
    if (appStatus.status == "Denied" || appStatus.status == "Blacklisted")
      await memberUtils.removeProficiencies();
    await memberUtils.removeVerifiedRole();
    this.updateMessage(interaction, application);
  }

  async accept(appId, user) { this.state.setApplicationStatus("Accepted", appId, user); }
  async deny(appId, user) { this.state.setApplicationStatus("Denied", appId, user); }
  async blackList(appId, user) { this.state.setApplicationStatus("Blacklisted", appId, user); }

  async updateMessage(interaction, state) {
    this.getMember();
    const menu = new MenuGuildApplication(this.member, state);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();
    if (interaction.isModalSubmit()) {
      await interaction.update({ embeds: embeds, components: [] });
      this.state.removeAppStatus(interaction.message.id);
    } else if (interaction.isSelectMenu())
      await interaction.update({ components: components, embeds: embeds });
    else if (isCommand(interaction))
      await interaction.editReply({
        content: "Please select the approriate answers and click continue",
        components: components,
        embeds: embeds,
      });
  }


};
