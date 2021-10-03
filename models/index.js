const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// const User = require('./user');
const Club = require("./club");
const CommunityPost = require('./communitypost');
const CommunityHashtag = require("./communityhashtag");
const User = require('./user')
const Mountain = require('./mountain')

///////////////////////////////////////////

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
////디비형식 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// db.User = User;
db.Club = Club;
db.CommunityPost = CommunityPost;
db.CommunityHashtag = CommunityHashtag;
db.User = User;
db.Mountain = Mountain;

// User.init(sequelize);
Club.init(sequelize);
CommunityPost.init(sequelize);
CommunityHashtag.init(sequelize);
User.init(sequelize);
Mountain.init(sequelize);

User.associate(db);
Club.associate(db);
CommunityPost.associate(db);
CommunityHashtag.associate(db);

///////////////////////////////////////////
module.exports = db;
