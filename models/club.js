const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        start: {
          type: Sequelize.INTEGER(5),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Club",
        tableName: "clubs",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // static associate(db) {
  //   db.Post.belongsTo(db.User);
  //   db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
  // }
};
