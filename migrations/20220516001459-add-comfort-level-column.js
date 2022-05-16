'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // add comfortLevel column to UserSkills
    await queryInterface.addColumn('UserSkills', 'comfortLevel', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
  },

  async down (queryInterface, Sequelize) {
    // remove comfortLevel column from UserSkills
    await queryInterface.removeColumn('UserSkills', 'comfortLevel')
  }
};
