const Sequelize = require('sequelize');
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// const User = require('./user');
const Post = require('./post');

///////////////////////////////////////////

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// db.User = User;
db.Post = Post;

// User.init(sequelize);
Post.init(sequelize);

///////////////////////////////////////////
module.exports = db;