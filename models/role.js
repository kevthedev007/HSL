'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      Role.hasOne(User, {
        foreignKey: { name: "roleId", allowNull: false },
        as: "user",
      });
    }

    toJSON() {
      return {
        ...this.get(),
        createdAt: undefined,
        updatedAt: undefined
      };
    }
  };
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};