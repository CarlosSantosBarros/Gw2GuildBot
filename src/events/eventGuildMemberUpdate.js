const { isProtectedRole } = require("../utils/utils");

module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    const logs = await oldMember.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_ROLE_UPDATE",
    });
    const logEntry = logs.entries.first();
    if (logEntry.executor.bot) return;
    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;
    const actionedRole = oldRoles.difference(newRoles).first();
    console.log(logEntry);
    if (!isProtectedRole(actionedRole)) return;
    if (oldRoles.size > newRoles.size)
      await newMember.roles.add(actionedRole.id, "Protected Role (removed)");
    if (oldRoles.size < newRoles.size)
      await newMember.roles.remove(actionedRole.id, "Protected Role (added)");
  },
};
