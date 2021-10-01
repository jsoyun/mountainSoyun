const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();
//로그인창 띄우기
router.get("/", (req, res, next) => {
  res.render("login");
});

//회원가입 라우터
router.get("/", isNotLoggedIn, async (req, res, next) => {
  console.log("1");
  const { email, nick, password } = req.body;
  try {
    //기존에 같은 이메일로 가입한 사용자가 있는지 조회
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      //있으면 회원가입페이지로되돌려. 주소에 에러표기해서
      return res.redirect("/join?error=exist");
    }
    //bcrypt모듈의 hash메서드 쓰면 비밀번호 암호화할 수 있어.
    const hash = await bcrypt.hash(password, 12);
    //같은 이메일로 가입한 사용자 없다면 비밀번호 암호화하고 사용자 정보를 생성.(프로미스를 지원하는 함수이므로 await사용)
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//로그인 라우터
//로그인 요청이 들어오면
router.post("/", isNotLoggedIn, (req, res, next) => {
  //passport.authenticate("local")미들웨어가 로컬로그인 전략수행(미들웨어인데 라우터 미들웨어 안에 들어있음.미들웨어에 사용자 정의기능추가하고 싶을때이렇게함.이럴때는 내부미들웨어에 (req,res,next)인수로 제공해서 호출하면됨)
  passport.authenticate("local", (authError, user, info) => {
    //콜백함수의 첫번째 매개변수(authErr)값이 있다면 실패한것
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    //두번째 매개변수 값이 있다면 성공한것. req.login 메서드를 호출
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); //미들웨어 내의 미들웨어에는 (req,res,next)를 붙입니다.
});

//로그아웃 라우터
router.get("/logout", isLoggedIn, (req, res) => {
  //req.logout메서드는 req.user객체를 제거
  req.logout();
  //세션객체내용제거
  req.session.destroy();
  res.redirect("/");
});

//카카오 로그인 라우터
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

// /* GET page. */
// router.get("/login", (req, res) => {
//   res.render("login");
// });

module.exports = router;
