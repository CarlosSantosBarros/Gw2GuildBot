module.exports = async (member) => {
  console.log(`Member ${member.displayName} left`);
  await require("../../modules/moduleMemberLog.js")(member, "Left");
};
