module.exports = class FieldAppStatus {
  constructor(state) {
    return {
      name: `${state.status} by: ${state.user}`,
      value: `${state.reason}`,
      inline: false,
    };
  }
};
