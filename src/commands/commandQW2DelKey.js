const { User } = require("../database/");

module.exports = {
  name: "delkey",
  description: "Delete API key",
  args: [],
  usage: "<APIKEY>",

  async execute(message) {
    await User.destroy({
      where: {
        snowflake: message.author.id,
      },
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    message.reply(`Key deleted`);
  },
};
