const { InterfaceGW2Player } = require("../classes/database");

module.exports = {
  name: "guildMemberRemove",
  once: false,
  async execute(member) {
    const gw2db = new InterfaceGW2Player();
    await gw2db.deletePlayer(member.id);
  },
};
