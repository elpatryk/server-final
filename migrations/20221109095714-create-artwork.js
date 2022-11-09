"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("artworks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageUrl: { allowNull: false, type: Sequelize.STRING },
      hearts: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
      minimumBid: { allowNull: false, type: Sequelize.INTEGER },
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
    await queryInterface.dropTable("artworks");
  },
};
