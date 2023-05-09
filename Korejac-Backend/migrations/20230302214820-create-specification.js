'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Specifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      num: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      agencija: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vrsta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      marka: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reg: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tehnicki: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      placeno: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      napomena: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      datum: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Specifications');
  }
};