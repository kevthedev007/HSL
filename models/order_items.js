'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, Order }) {
      // define association here
      Order_Items.belongsTo(Product, {
        foreignKey: { name: "productId", allowNull: false },
        as: "product", onDelete: 'CASCADE'
      });
      Order_Items.belongsTo(Order, {
        foreignKey: { name: "orderId", allowNull: false },
        as: "order", onDelete: 'CASCADE'
      });
    }
  };
  Order_Items.init({
    productId: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Items',
  });
  return Order_Items;
};