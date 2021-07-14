module.exports = async (member) => {
    console.log(`Member ${member.displayName} joined`);
    await require("../modules/moduleMemberLog.js")(member, "Joined");
};