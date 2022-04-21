'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn("Jobs", "title",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          {
            transaction: t,
          }
        ),
        queryInterface.changeColumn("Jobs", "company",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          {
            transaction: t,
          }
        ),
        queryInterface.changeColumn("Jobs", "link",
          {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Jobs", "title"),
      queryInterface.changeColumn("Jobs", "company"),
      queryInterface.changeColumn("Jobs", "link"),
    ]);
  }
};
