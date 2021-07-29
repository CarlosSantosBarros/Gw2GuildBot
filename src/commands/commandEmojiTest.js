const { Collection } = require("discord.js");

module.exports = {
  name: "testemoji",
  description: "Test emoji functionality",
  args: [],
  usage: "<comand>",

  async execute(message) {
    // put this in module
    const optionCollection = new Collection();
    const optionCollectionArrray = [
      { emoji: "870320439505866763", action: "xSquare" },
      { emoji: "870320439736553472", action: "xStar" },
      { emoji: "870320439732367431", action: "xCircle" },
    ];
    optionCollectionArrray.forEach((entry) => {
      optionCollection.set(entry.emoji, entry.action);
    });
    ///////////////////////////////////////////////////////////////////////////////

    message.channel.send("Test?").then((botmessage) => {
      // put this is module also
      optionCollectionArrray.forEach((entry) => {
        optionCollection.set(entry.emoji, entry.action);
        botmessage.react(entry.emoji);
      });
      //////////////////////////////////////////////////////////////////////////////////

      // exctract filter
      const filter = (reaction, user) => {
        const hasClickedEmoji = () => {
          if (
            optionCollection.find((entry) => entry.emoji === reaction.emoji.id)
          )
            return true;
        };
        return hasClickedEmoji && user.id === message.author.id;
      };

      // collector goes in utill
      // pass message and config
      // config has collection and collectorSettings
      // excutes function bassed on reaction
      // may return deppending on action function
      const collector = botmessage.createReactionCollector(filter, {
        max: 1,
        time: 60000,
        errors: ["time"],
      });
      // bot responds with selected options
      collector.on("collect", (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      });
      collector.on("end", (collected) => {
        console.log(`Collected ${collected.size} items`);
        // bot removes all
        botmessage.reactions.removeAll().catch((error) => {
          console.error("Failed to clear reactions: ", error);
          throw "Something bad happened";
        });
        //   bot re-inputs selected one
        botmessage.react(collected.first().emoji.id);
      });
    });
  },
};
