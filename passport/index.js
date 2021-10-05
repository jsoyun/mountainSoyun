const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  //serializeUser는 로그인시 실행됨! req.session(세션)객체에 어떤 데이터를 저장할지 정하는 메서드
  //매개변수로 user를받고나서 done함수에 두번째 인수로 user.id를 넘기고 있음.사용자정보들어있음
  passport.serializeUser((user, done) => {
    //done함수의 첫번째 인수는 에러발생시 사용하는 것, 두번째인수에는 저장하고 싶은 데이터넣음
    done(null, user.id);
  });
  //deserializeUser는 매요청시 실행됨. passport.session미들웨어가 이 메서드를 호출
  //serializeUser의 done의 두번째 인수로 넣은 데이터가 deserializeUser의 매개변수가 됨.여기서는 사용자아이디.
  passport.deserializeUser((id, done) => {
    //serializeUser에서 세션에 저장한 아이디를 받아 데이터베이스에서 사용자정보를 조회.
    User.findOne({
      where: { id },
      include: [
        { model: User, attributes: ["id", "nick"], as: "Followers" },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      //조회한 정보를 req.user에 저장.앞으로 req.user를 통해 로그인한 사용자의 정보가져올 수있음
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
  kakao();
};
