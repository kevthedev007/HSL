'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      selling_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('vitamins', 'collagen'),
        allowNull: false
      },
      store: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.ENUM('available', 'unavailable'),
        defaultValue: 'available',
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING
      },
      cloudinary_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};