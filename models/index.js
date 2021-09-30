const Sequelize = require("sequelize");
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// const User = require('./user');

///////////////////////////////////////////

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Post = require("./post");
const Hashtag = require("./hashtag");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

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
// db.Sequelize = Sequelize;
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// db.User = User;

// User.init(sequelize);

// User.associate(db);
///////////////////////////////////////////
module.exports = db;
