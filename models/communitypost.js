const Sequelize = require("sequelize");

/* 커뮤니티 게시글 DB */
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
        views: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        }
      },
      {
        sequelize,             
        timestamps: false,    
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
    db.CommunityPost.belongsToMany(db.User, { through: 'Recommends' });  // 좋아요
    db.CommunityPost.hasMany(db.Communitycomment, { foreignKey: "postId", sourceKey: "id" });
  }
};
