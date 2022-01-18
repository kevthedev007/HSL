'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'client',
      },
      {
        id: 2,
        name: 'pharmacist_principal',
      },
      {
        id: 3,
        name: 'doctor_principal',
      },
      {
        id: 4,
        name: 'admin'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Roles', null, {});
  }
};
