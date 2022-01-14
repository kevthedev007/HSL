'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suggested_Nutrient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Nutrient_Result, Nutrient_Form }) {
      // define association her
      Suggested_Nutrient.belongsTo(Nutrient_Form, {
        foreignKey: { name: "formId", allowNull: false },
        as: "nutrient_form", onDelete: 'CASCADE'
      });
      Suggested_Nutrient.belongsTo(Nutrient_Result, {
        foreignKey: { name: "resultId", allowNull: false },
        as: "nutrient_result", onDelete: 'CASCADE'
      });
    }
  };
  Suggested_Nutrient.init({
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
    vitamins: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('vitamins');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('vitamins', val.join(','));
      }
    },
    minerals: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('minerals');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('minerals', val.join(','));
      }
    },
    herbs: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('herbs');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('herbs', val.join(','));
      }
    },
    foods: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('foods');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('foods', val.join(','));
      }
    },
    fruits: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('fruits');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('fruits', val.join(','));
      }
    }
  }, {
    sequelize,
    modelName: 'Suggested_Nutrient',
  });
  return Suggested_Nutrient;
};