'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recommended_Supplements', {
      id: {
        llowNull: false,
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
      gold_package: {
        type: Sequelize.STRING
      },
      platinum_package: {
        type: Sequelize.STRING
      },
      diamond_package: {
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
    await queryInterface.dropTable('Recommended_Supplements');
  }
};