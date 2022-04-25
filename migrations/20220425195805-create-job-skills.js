'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobSkills', {
      skillId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Skills" },
          key: "id",
        },
        onDelete: "cascade",
        allowNull: false,
      },
      jobId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Jobs" },
          key: "id",
        },
        onDelete: "cascade",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.addConstraint('JobSkills', {
        fields: ['skillId', 'jobId'],
        type: 'primary key',
        name: 'JobSkills_pkey'
      });
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobSkills');
  }
};