'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      Client_Details.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: false },
        as: "client", onDelete: 'CASCADE'
      });
    }
  };
  Client_Details.init({
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    nickname: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    whatsapp_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    family_size: DataTypes.INTEGER,
    address: DataTypes.STRING,
    payment_option: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client_Details',
  });
  return Client_Details;
};