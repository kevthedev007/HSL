'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nutrient_Results', {
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
      beneficiary_overview: {
        type: Sequelize.STRING
      },
      research_suggestion: {
        type: Sequelize.STRING
      },
      endorsed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Nutrient_Results');
  }
};