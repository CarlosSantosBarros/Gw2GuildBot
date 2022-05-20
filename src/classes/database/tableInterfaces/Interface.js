const { UniqueConstraintError } = require("sequelize");
module.exports = class Interface {
  constructor(model) {
    this.interfaceModel = model;
    this.querySelector;
  }

  setSelector(selector) {
    this.querySelector = selector;
  }

  /**
   * @return {Promise<Array>}
   */
  async getAll() {
    return await this.interfaceModel.findAll();
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

  async findOrCreate() {
    return await this.interfaceModel
      .findOrCreate(this.querySelector)
      .catch((error) => {
        if (error instanceof UniqueConstraintError)
          throw "Entry already exists";
      });
  }

  async update(newValue) {
    return await this.interfaceModel.update(newValue, this.querySelector);
  }
};
