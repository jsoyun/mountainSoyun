const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new FacebookStrategy({
      clientID: process.env.Facebook_ID,
      clientSecret: process.env.Facebook_secret,
      callbackURL: "/login/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
    try { 
      console.log(profile);
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: "facebook" },
      });
      if(exUser) {
        done(null, exUser);
       }else {
        const newUser = await User.create({
          // id : 2,  //랜덤값 필요시, npm shortid 설치 후 shortid.generate() 활용
          provider : profile.provider,
          snsId : profile.id,
          // token : accessToken,
          nick : profile.displayName,
          email : profile.emails[0].value
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
}