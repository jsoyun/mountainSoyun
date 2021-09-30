const Sequelize = require("sequelize");
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// const User = require('./user');
const Club = require("./club");
const Post = require('./post');
const User = require("./user");
const Post = require("./post");
const Hashtag = require("./hashtag");

///////////////////////////////////////////

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db.Sequelize = Sequelize;
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// db.User = User;
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Club = Club;

// User.init(sequelize);
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Club.init(sequelize);

// User.associate(db);
User.associate(db);
Post.associate(db);
Hashtag.associate(db);


///////////////////////////////////////////
module.exports = db;
