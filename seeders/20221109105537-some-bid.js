"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "apple@apple.com",
          amount: 200,
          artworkId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "banana@banana.com",
          amount: 240,
          artworkId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "coco@coco.com",
          amount: 390,
          artworkId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "coco@coco.com",
          amount: 390,
          artworkId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "apple@apple.com",
          amount: 200,
          artworkId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "banana@banana.com",
          amount: 230,
          artworkId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {});
  },
};
