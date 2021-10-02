const Sequelize = require('sequelize');

module.exports = class CommunityHashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Communityhashtag',
            tableName: 'communityhashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.CommunityHashtag.belongsToMany(db.CommunityPost, { through: 'PostHashtag' });
    }    
}