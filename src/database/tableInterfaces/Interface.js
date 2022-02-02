const { UniqueConstraintError } = require("sequelize");
module.exports = class Interface {
  constructor(model) {
    this.interfaceModel = model;
    this.querySelector;
  }

  setSelector(selector) {
    this.querySelector = selector;
  }

  async getAll(query) {
    return await this.interfaceModel.findAll(query);
  }

  async get() {
    return await this.interfaceModel.findOne(this.querySelector);
  }

  async deleted() {
    return await this.interfaceModel.destroy(this.querySelector);
  }

  async create() {
    return await this.interfaceModel
      .create(this.querySelector.where)
      .catch((error) => {
        if (error instanceof UniqueConstraintError)
          throw "Entry already exists";
      });
  }

  async update(newValue) {
    return await this.interfaceModel.update(newValue, this.querySelector);
  }
};
