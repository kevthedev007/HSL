'use strict';

const { NOW } = require("sequelize/dist");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'client',
        createdAt: NOW(),
        updatedAt: NOW(),
      },
      {
        name: 'pharmacist_principal',
        createdAt: NOW(),
        updatedAt: NOW(),
      },
      {
        name: 'doctor_principal',
        createdAt: NOW(),
        updatedAt: NOW(),
      },
      {
        name: 'admin'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Roles', null, {});
  }
};
