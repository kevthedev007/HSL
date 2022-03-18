'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplement_Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Nutrient_Result, Nutrient_Form }) {
      // define association here
      Supplement_Discount.belongsTo(Nutrient_Form, {
        foreignKey: { name: "formId", allowNull: false },
        as: "nutrient_form", onDelete: 'CASCADE'
      });
      Supplement_Discount.belongsTo(Nutrient_Result, {
        foreignKey: { name: "resultId", allowNull: false },
        as: "nutrient_result", onDelete: 'CASCADE'
      });
    }
  };
  Supplement_Discount.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    formId: {
      type: DataTypes.UUID,
      references: {
        model: 'Nutrient_Forms',
        key: 'id'
      }
    },
    resultId: {
      type: DataTypes.UUID,
      references: {
        model: 'Nutrient_Results',
        key: 'id'
      }
    },
    gold_discount: DataTypes.INTEGER,
    platinum_discount: DataTypes.INTEGER,
    diamond_discont: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Supplement_Discount',
  });
  return Supplement_Discount;
};