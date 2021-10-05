const Sequelize = require("sequelize");

/* DB */
module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        //   followingId: {
        //     type: Sequelize.STRING(15),
        //     allowNull: false,
        //   },
        //   followerId: {
        //     type: Sequelize.STRING(30),
        //     allowNull: true,
        //   },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Like",
        tableName: "likes",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.Club, { through: "Like" });
    db.Club.belongsToMany(db.User, { through: "Like", as: "Liker" });
  }
};
