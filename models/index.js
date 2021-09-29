const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';  // 2. NODE_ENV 를 따로 설정하지 않으면, config 안의 development 를 가져온다.
const config = require('../config/config')[env];  // 1. config 안의 config 설정 파일을 가져온다.
/* 앞으로 만들 모델 들 */
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
/* 앞으로 만들 모델 들 */

const db = {};
const sequelize = new Sequelize(    // new Sequelize 해서 설정들 넣으면 연결 객체가 됨.
  config.database, config.username, config.password, config,
);

// 연결 객체 활용
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;
