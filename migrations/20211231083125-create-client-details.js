'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Client_Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      nickname: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      whatsapp_number: {
        type: Sequelize.STRING,
      },
      family_size: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      payment_option: {
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
    await queryInterface.dropTable('Client_Details');
  }
};