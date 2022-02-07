'use strict';
const {
  Model
} = require('sequelize');
const zlib = require('zlib')
module.exports = (sequelize, DataTypes) => {
  class Health_Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      Health_Testimonial.belongsTo(User, {
        foreignKey: { name: "userId", allowNull: false },
        as: "user", onDelete: 'CASCADE'
      });
    }
  };
  Health_Testimonial.init({
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
    description: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue('description');
        const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        return uncompressed.toString();
      },
      set(value) {
        const compressed = zlib.deflateSync(value).toString('base64');
        this.setDataValue('description', compressed)
      }
    }
  }, {
    sequelize,
    modelName: 'Health_Testimonial',
  });
  return Health_Testimonial;
};