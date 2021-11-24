const Sequelize = require("sequelize"); 
const env = process.env.NODE_ENV || "development"; 
const config = require("../config/config")[env];

const Club = require("./club");
const Hashtag = require("./clubhashtag");
const ClubComment = require("./clubcomments");
const CommunityPost = require("./communitypost");
const User = require("./user");
const Mountain = require("./mountain");
const Img = require("./clubimg");
const Communitycomment = require("./communitycomments");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Club = Club;
db.Hashtag = Hashtag;
db.ClubComment = ClubComment;
db.CommunityPost = CommunityPost;
db.User = User;
db.Mountain = Mountain;
db.Img = Img;
db.Communitycomment = Communitycomment;

Club.init(sequelize);
Hashtag.init(sequelize);
ClubComment.init(sequelize);
CommunityPost.init(sequelize);
User.init(sequelize);
Mountain.init(sequelize);
Img.init(sequelize);
Communitycomment.init(sequelize);

User.associate(db);
Club.associate(db);
Hashtag.associate(db);
ClubComment.associate(db);
CommunityPost.associate(db);
Mountain.associate(db);
Img.associate(db);
Communitycomment.associate(db);

module.exports = db;
