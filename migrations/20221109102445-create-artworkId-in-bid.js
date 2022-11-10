"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bids", "artworkId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "artworks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("bids", "artworkId");
  },
};
