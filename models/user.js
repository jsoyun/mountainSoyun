const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true, // unique: true - 고유하게
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Club, { foreignKey: "userId", sourceKey: "id" });
    db.User.hasMany(db.CommunityPost);
    // 1대다 관계 - (ex) 사용자 1명은 댓글 여러개를 작성할 수 있다. 반대로 댓글 1개에 사용자 여러명은 안된다.
    // << 사용법 >> db.사용자.hasMany(db.댓글);
    // ++ User(사용자) 입장에서 남은 Comment(댓글) 이라 foreignKey(외래키) -> [[Comment(남) 의 commenter 컬럼이 User(나) 의 id 를 참조하고 있다는 의미]]
    // << 사용법 >> db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });

    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
    db.User.belongsToMany(db.CommunityPost, {
      through: "Recommends",
      as: "recommenders",
    }); // 좋아요
    db.User.belongsToMany(db.Club, { through: "Likes", as: "Likers" }); // 좋아요
    db.User.belongsToMany(db.Club, { through: "Stars", as: "Start" }); // 별점
    db.User.hasMany(db.ClubComment, {
      foreignKey: "writerId",
      sourceKey: "id",
    });
    // 다대다 관계 - (ex) 게시글 하나가 여러개의 해시태그를 가질 수 있다. 해시태그 하나도 여러개의 게시글을 가질 수 있다.
    // 다대다 관계가 되면 데이터베이스 정규화 원칙을 지키기위해 어쩔 수 없이 테이블을 하나 더 생성해야한다.({ through: 'PostHashtag' } 이부분이 어쩔 수 없이 셍성한 테이블)
    // << 사용법 >> db.Post.belongsToMany*(db.Hashtag, { through: 'PostHashtag' });
    // << 이어서 >> db.Hashtag.belongsToMany*(db.Post, { through: 'PostHashtag' });
  }
};
