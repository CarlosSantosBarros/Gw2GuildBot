// eslint-disable-next-line no-unused-vars
const { User, GuildMember } = require("discord.js");
const StateGuildApplication = require("./state/StateGuildApplication");
const { ServerUtils, MemberUtils } = require("../utils");
const MenuGuildApplication = require("./menus/menuGuildApplication");
const { GW2Player } = require("./GW2Player");
const { getWorld } = require("../utils/utilsGw2API");
const { InterfaceGuildApplication } = require("./database");
const { isCommand } = require("../utils/utilsTypeGuard");

module.exports = class ClassGuildApplication {
  /**
   * @param {GuildMember} member;
   * @param {ServerUtils} server */
  constructor(member, server) {
    this.server = server;
    this.member = new MemberUtils(member, server);
    this.state = new StateGuildApplication(member.user);
    this.db = new InterfaceGuildApplication();
    this.userId = member.user.id;
  }

  async startApplication(interaction) {
    const player = new GW2Player(this.member);
    const accountData = await player.getApplicationData();
    const serverInfo = await getWorld(accountData.application.server);
    const newState = this.state.setAccountData(accountData, serverInfo);
    await this.updateMessage(interaction, newState);
  }

  async selectIsLegal(interaction) {
    const newState = this.state.setIsLegal(interaction.values[0]);
    await this.updateMessage(interaction, newState);
  }

  async selectWillRoleSwap(interaction) {
    const newState = this.state.setWillRoleSwap(interaction.values[0]);
    await this.updateMessage(interaction, newState);
  }

  async writePersonalMessage(message) { this.state.setPersonalMessage(message); }

  async submit() {
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
    await this.db.updateStatus(appStatus);
    const application = await this.db.getApplication();
    const member = this.server.getMemberById(application.snowflake);
    await member.send({ content: dmReply });
    const applicationMember = new MemberUtils(member, this.server);
    if (appStatus.status == "Denied" || appStatus.status == "Blacklisted") {
      await applicationMember.removeProficiencies();
      await applicationMember.removeVerifiedRole();
    }
    await this.updateMessage(interaction, application);
  }

  async accept(appId, user) { this.state.setApplicationStatus("Accepted", appId, user); }
  async deny(appId, user) { this.state.setApplicationStatus("Denied", appId, user); }
  async blackList(appId, user) { this.state.setApplicationStatus("Blacklisted", appId, user); }

  async updateMessage(interaction, state) {
    const menu = new MenuGuildApplication(this.member, state);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();
    if (interaction.isModalSubmit()) {
      await interaction.update({ embeds: embeds, components: [] });
      this.state.removeAppStatus(interaction.message.id);
    } else if (interaction.isStringSelectMenu())
      await interaction.update({ components: components, embeds: embeds });
    else if (isCommand(interaction))
      await interaction.editReply({
        content: "Please select the approriate answers and click continue",
        components: components,
        embeds: embeds,
      });
  }


};
