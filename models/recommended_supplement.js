'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recommended_Supplement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Nutrient_Result, Nutrient_Form }) {
      // define association here
      Recommended_Supplement.belongsTo(Nutrient_Form, {
        foreignKey: { name: "formId", allowNull: false },
        as: "nutrient_form", onDelete: 'CASCADE'
      });
      Recommended_Supplement.belongsTo(Nutrient_Result, {
        foreignKey: { name: "resultId", allowNull: false },
        as: "nutrient_result", onDelete: 'CASCADE'
      });
    }
  };
  Recommended_Supplement.init({
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
    gold_package: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('gold_package');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('gold_package', val.join(','));
      }
    },
    platinum_package: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('platinum_package');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('platinum_package', val.join(','));
      }
    },
    diamond_package: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('diamond_package');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('diamond_package', val.join(','));
      }
    }
  }, {
    sequelize,
    modelName: 'Recommended_Supplement',
  });
  return Recommended_Supplement;
};