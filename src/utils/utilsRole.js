exports.RoleUtils = class {
  constructor() {
    this.roles;
  }
  init(roles) {
    this.roles = roles;
  }
  getRoleByName(roleName) {
    return this.roles.cache.find((role) => role.name === roleName);
  }
  getAllRolesByName(roleName) {
    return this.roles.cache.filter((role) => role.name === roleName);
  }

  getRoleById(id) {
    return this.roles.cache.find((role) => role.id === id);
  }
  getRoleByColor(colorHexValue) {
    return this.roles.cache.find((role) => role.hexColor === colorHexValue);
  }

  getAllRolesByColor(colorHexValue) {
    return this.roles.cache.filter((role) => role.hexColor === colorHexValue);
  }

  getRoleByNameAndColor(roleName, colorHexValue) {
    return this.roles.cache.find(
      (role) => role.hexColor === colorHexValue && role.name === roleName
    );
  }
};
