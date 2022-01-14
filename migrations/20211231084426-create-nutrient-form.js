'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nutrient_Forms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      weight: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      habits: {
        type: Sequelize.STRING
      },
      current_health_complaints: {
        type: Sequelize.STRING
      },
      current_medication: {
        type: Sequelize.STRING
      },
      health_fear: {
        type: Sequelize.STRING
      },
      family_history: {
        type: Sequelize.STRING
      },
      allergies: {
        type: Sequelize.STRING
      },
      desired_lifestyle: {
        type: Sequelize.STRING
      },
      preferred_drug_form: {
        type: Sequelize.STRING
      },
      usual_health_spending: {
        type: Sequelize.STRING
      },
      proposed_monthly_budget: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Nutrient_Forms');
  }
};