'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Suggested_Nutrients', {
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
      vitamins: {
        type: Sequelize.STRING
      },
      minerals: {
        type: Sequelize.STRING
      },
      herbs: {
        type: Sequelize.STRING
      },
      foods: {
        type: Sequelize.STRING
      },
      fruits: {
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
    await queryInterface.dropTable('Suggested_Nutrients');
  }
};