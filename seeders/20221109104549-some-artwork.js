"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Nighthawks",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/480px-Nighthawks_by_Edward_Hopper_1942.jpg",
          hearts: 9,
          minimumBid: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "La persistencia de la memoria",
          imageUrl:
            "https://a.allegroimg.com/original/11e438/7450fce945719ea273af1da850f0/Salvador-Dali-Trwalosc-pamieci-zegary-70x100cm",
          hearts: 4,
          minimumBid: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          title: "American Gothic",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/1200px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
          hearts: 2,
          minimumBid: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("artworks", null, {});
  },
};
