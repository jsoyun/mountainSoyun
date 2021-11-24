const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.Google_ID,
      clientSecret: process.env.Google_secret,
      callbackURL: "/login/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
    try { 
      console.log(profile);
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: "google" },
      });
      if(exUser) {
        done(null, exUser);
       }else {
        const newUser = await User.create({
          provider : profile.provider,
          snsId : profile.id,
          nick : profile.displayName,
          email : profile.emails[0].value,
          img: '/img/basic.png',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
}
