const Sequelize = require("sequelize");

module.exports = class CommunityPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "CommunityPost",
        tableName: "communityposts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.CommunityPost.belongsTo(db.User);
    db.CommunityPost.belongsToMany(db.CommunityHashtag, {
      through: "PostHashtag",
    });
  }
};
