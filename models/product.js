'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product_Detail, Cart, Order_Items }) {
      // define association here
      Product.hasOne(Product_Detail, {
        foreignKey: { name: "productId", allowNull: false },
        as: "product_details",
      });
      Product.hasMany(Cart, {
        foreignKey: { name: "productId", allowNull: false },
        as: "cart",
      });
      Product.hasMany(Order_Items, {
        foreignKey: { name: "productId", allowNull: false },
        as: "order_items",
      });
    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined }
    }
  };
  Product.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    selling_price: DataTypes.INTEGER,
    category: DataTypes.ENUM('vitamins', 'collagen'),
    store: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('store');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('store', val.join(','));
      }
    },
    availability: {
      type: DataTypes.ENUM('available', 'unavailable'),
      defaultValue: 'available'
    },
    avatar: DataTypes.STRING,
    cloudinary_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};