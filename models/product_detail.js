'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      Product_Detail.belongsTo(Product, {
        foreignKey: { name: "productId", allowNull: false },
        as: "product", onDelete: 'CASCADE'
      });
    }
  };
  Product_Detail.init({
    productId: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    body_care: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('body_care');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('body_care', val.join(','));
      }
    },
    habits: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('habits');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('habits', val.join(','));
      }
    },
    lifestyle_goals: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('lifestyle_goals');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('lifestyle_goals', val.join(','));
      }
    },
    gender: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('gender');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('gender', val.join(','));
      }
    },
    age: DataTypes.INTEGER,
    career_type: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('career_type');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('career_type', val.join(','));
      }
    },
    brands: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('brands');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('brands', val.join(','));
      }
    },
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Detail',
  });
  return Product_Detail;
};