const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content : {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: {      // img 한개 올릴 수 있음, 
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,     // 진짜 삭제한다.
            charset: 'utf8mb4',     // 이모티콘 가능
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });  // N대M 관계로 중간 테이블 생성
    }  // foreignKey 가 없으면 기본적으로 postId 랑 hashtagId 가 된다.
};