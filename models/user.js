'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Client_Details, Nutrient_Form, Blog, Health_Testimonial, HSL_Testimonial }) {
      // define association here
      User.belongsTo(Role, {
        foreignKey: { name: "roleId", allowNull: false },
        as: "role", onDelete: 'CASCADE'
      });
      User.hasOne(Client_Details, {
        foreignKey: { name: "userId", allowNull: false },
        as: "client_details",
      });
      User.hasMany(Nutrient_Form, {
        foreignKey: { name: "userId", allowNull: false },
        as: "nutrient_form",
      });
      User.hasMany(Blog, {
        foreignKey: { name: "userId", allowNull: false },
        as: "blog",
      });
      User.hasMany(Health_Testimonial, {
        foreignKey: { name: "userId", allowNull: false },
        as: "health_testimonial",
      });
      User.hasMany(HSL_Testimonial, {
        foreignKey: { name: "userId", allowNull: false },
        as: "hsl_testimonial",
      });
    };


    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined }
    }
  };
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: DataTypes.STRING,
    roleId: {
      type: DataTypes.INTEGER,
      type: DataTypes.UUID,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    referral_code: DataTypes.STRING,
    referrer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};