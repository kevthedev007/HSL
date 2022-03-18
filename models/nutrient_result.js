'use strict';
const zlib = require('zlib')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nutrient_Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Nutrient_Form, Suggested_Nutrient, Recommended_Supplement, Supplement_Discount }) {
      // define association here
      Nutrient_Result.belongsTo(Nutrient_Form, {
        foreignKey: { name: "formId", allowNull: false },
        as: "nutrient_form", onDelete: 'CASCADE'
      });
      Nutrient_Result.hasOne(Suggested_Nutrient, {
        foreignKey: { name: "resultId", allowNull: false },
        as: "suggested_nutrient",
      });
      Nutrient_Result.hasOne(Recommended_Supplement, {
        foreignKey: { name: "resultId", allowNull: false },
        as: "recommended_supplement",
      });
      Nutrient_Result.hasOne(Supplement_Discount, {
        foreignKey: { name: "resultId", allowNull: false },
        as: "supplement_discount",
      });
    }
  };
  Nutrient_Result.init({
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
    beneficiary_overview: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue('beneficiary_overview');
        const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        return uncompressed.toString();
      },
      set(value) {
        const compressed = zlib.deflateSync(value).toString('base64');
        this.setDataValue('beneficiary_overview', compressed)
      }
    },
    research_suggestion: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue('research_suggestion');
        const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        return uncompressed.toString();
      },
      set(value) {
        const compressed = zlib.deflateSync(value).toString('base64');
        this.setDataValue('research_suggestion', compressed)
      }
    },
    endorsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Nutrient_Result',
  });
  return Nutrient_Result;
};