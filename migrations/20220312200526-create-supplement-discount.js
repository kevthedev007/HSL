'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Supplement_Discounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      formId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Nutrient_Forms',
          key: 'id'
        }
      },
      resultId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Nutrient_Results',
          key: 'id'
        }
      },
      gold_discount: {
        type: Sequelize.INTEGER
      },
      platinum_discount: {
        type: Sequelize.INTEGER
      },
      diamond_discont: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Supplement_Discounts');
  }
};