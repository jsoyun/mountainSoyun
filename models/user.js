const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {   // 이 클래스가 모델이 되고, MySQL 과 매칭이 된다.
    static init(sequelize) {    // static 으로 Sequelize 에서 정함
        return super.init({     // super(부모 모델).init : init 을 하면 그 모양대로 테이블이 만들어진다.
            email : {       // id : 부분은 생략되었다. (시퀄라이저는 기본적으로 생성해준다.)
                type: Sequelize.STRING(40),
                allowNull: true,    // 비어있어도 되고,
                unique: true,   // 고유해야한다.
                // 두개의 빈값이 있으면 같은 것으로 안친다, unique 가 true 여도 allowNill 이 true 일 수 있다.
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),    // 해시화되면 글자수가 늘어나서 여유롭게 100글자로 정한다.
                allowNull: true,    // 카카오로 로그인하면 비밀번호가 없을 수도 있다.
            },
            provider: {     // 로그인 제공자
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',  // 카카오, 네이버 등등으로 로그인한것
            },
            snsId: {    // 카카오나, 네이버 등등으로 로그인할 경우 snsId 를 저장해둔다.
                type: Sequelize.STRING(30),
                allowNullL: true,
            },
        }, {
            sequelize,
            timestamps: true,   // 각자 날짜 자동 등록
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,     // 삭제한척
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {   // 사용자 테이블과의 N대M 관계
            foreignKey: 'followingId',  // foreignKey 가 없으면 둘다 userId 라 구분이 안되서 넣어둔다.
            as: 'Followers',  // Javascript 에서 사용되는 단어로 반대 관계의 foreignKey 의 s 를 붙인다.
            through: 'Follow',   // 중간 테이블
        });
        db.User.belongsToMany(db.User, {   // 사용자 테이블과의 N대M 관계
            foreignKey: 'followerId',  // foreignKey 가 없으면 둘다 userId 라 구분이 안되서 넣어둔다.
            as: 'Followings',
            through: 'Follow',   // 중간 테이블
        });
    }
};