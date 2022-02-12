module.exports = class FieldAppStatus {
  constructor(state) {
    return {
      name: `${state.status}`,
      value: `${state.reason}`,
      inline: false,
    };
  }
};
