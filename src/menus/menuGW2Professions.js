const { MessageActionRow } = require("discord.js");
const DiscordUtils = require("../utils/utilsDiscord");
const { buildButtons, SelectMenu } = require("./messageComponents");
const { professionsSettings } = require("../config.json");

const buttonData = [
  { customId: "set", label: "Set", style: "PRIMARY", disabled: true },
  { customId: "add", label: "Add", style: "PRIMARY", disabled: true },
  { customId: "remove", label: "Remove", style: "PRIMARY", disabled: true },
  {
    customId: "done",
    label: "Done",
    style: "SUCCESS",
    emoji: "870320857837346887",
    disabled: false,
  },
];

module.exports = class MenuGW2Profession {
  constructor(interaction) {
    this.interaction = interaction;
    this.buttonAction;
    this.availableProfessions = interaction.client.professionsData;
    this.menuState = this.interaction.client.gw2pState.get(
      this.interaction.user.id
    );
    console.log(this.menuState);
    this.proficiency = this.menuState ? this.menuState.proficiency : null;
    this.profession = this.menuState ? this.menuState.profession : null;
    this.memberUtils = new DiscordUtils.MemberUtils(this.interaction.member);
  }

  availableProfessionsFilter() {
    const currentProficiency = this.memberUtils.getRolesByColor(
      this.proficiency.color
    );
    if (currentProficiency.size == this.proficiency.professionCap) {
      const filter = (profession) =>
        this.proficiency.value === "main"
          ? !this.memberUtils.getRoleByNameAndColor(
              profession.value,
              professionsSettings.mentorColor
            )
          : this.memberUtils.getRoleByNameAndColor(
              profession.value,
              this.proficiency.color
            );
      this.availableProfessions =
        this.interaction.client.professionsData.filter((profession) =>
          filter(profession)
        );
    }
  }

  setActionButton() {
    this.buttonAction = "set";
    if (this.proficiency.value !== "main")
      this.buttonAction = this.memberUtils.getRoleByNameAndColor(
        this.profession,
        this.proficiency.color
      )
        ? "remove"
        : "add";
  }
  buildMenu() {
    if (this.proficiency) this.availableProfessionsFilter();
    if (this.profession) this.setActionButton();
    const selectProficiency = new SelectMenu(
      {
        customId: "proficiency",
        placeholder: "Proficiency",
      },
      this.interaction.client.proficiencyData,
      this.proficiency ? this.proficiency.value : null
    );
    const selectProfession = new SelectMenu(
      {
        customId: "profession",
        placeholder: "Select A profession",
        // eslint-disable-next-line no-unneeded-ternary
        disabled: this.proficiency ? false : true,
      },
      this.availableProfessions,
      this.profession
    );

    const buttons = buildButtons(buttonData, this.buttonAction);

    return [
      new MessageActionRow().addComponents(selectProficiency),
      new MessageActionRow().addComponents(selectProfession),
      new MessageActionRow().addComponents(buttons),
    ];
  }
};
