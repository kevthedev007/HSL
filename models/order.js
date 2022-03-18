'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order_Items }) {
      // define association here
      Order.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: true },
        as: "user", onDelete: 'CASCADE'
      });
      Order.hasMany(Order_Items, {
        foreignKey: { name: "orderId", allowNull: false },
        as: "order_items",
      });
    }
  };
  Order.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    shipping_method: DataTypes.STRING,
    shipping_price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    orderItems_total: DataTypes.INTEGER,
    order_total: DataTypes.INTEGER,
    order_status: {
      type: DataTypes.ENUM,
      values: ['Canceled', 'Submitted', 'Completed', 'Processing']
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};