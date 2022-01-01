'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nutrient_Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      Nutrient_Form.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: false },
        as: "client", onDelete: 'CASCADE'
      });
    }
  };

  Nutrient_Form.init({
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
    weight: DataTypes.STRING,
    height: DataTypes.STRING,
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
    current_health_complaints: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('current_health_complaints');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('current_health_complaints', val.join(','));
      }
    },
    current_medication: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('current_medication');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('current_medication', val.join(','));
      }
    },
    health_fear: {
      type: DataTypes.STRING,
    },
    family_history: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('family_history');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('family_history', val.join(','));
      }
    },
    allergies: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('allergies');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('allergies', val.join(','));
      }
    },
    desired_lifestyle: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('desired_lifestyle');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('desired_lifestyle', val.join(','));
      }
    },
    preferred_drug_form: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('preferred_drug_form');
        return rawValue ? rawValue.split(',') : null
      },
      set(val) {
        this.setDataValue('preferred_drug_form', val.join(','));
      }
    },
    usual_health_spending: DataTypes.STRING,
    proposed_monthly_budget: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nutrient_Form',
  });
  return Nutrient_Form;
};