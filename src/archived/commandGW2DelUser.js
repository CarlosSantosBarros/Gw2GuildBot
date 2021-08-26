const { deleteDBUserById } = require("../utils/utilsDatabase");

module.exports = {
  name: "deluser",
  description: "Delete user",
  args: [],
  usage: "",

  async execute(message) {
    const delResult = await deleteDBUserById(message.author.id);
    if (delResult === 0) throw "User does not exist in database";
    message.reply(`User deleted`);
  },
};
