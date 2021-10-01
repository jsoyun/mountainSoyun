//모듈
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//라우터
const router = express.Router();

//회원가입 창띄우기(get)
router.get("/", (req, res, next) => {
  res.render("signup");
});

//회원가입 데이터 입력한거 전송하는 코드
//여기로 이동! signUp 들어왔을때 뒤에 실행
//post 데이터들 있어서(post데이터 전송)
router.post("/signup", async (req, res, next) => {
  console.log("1");
  const { email, nick, password } = req.body;
  //User는 데이터베이스!거기에서 email 가져옴(기존 email확인하려고! 그전 유저exUser)
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/signUp?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    User.create({
      email,
      nick,
      password: hash,
    });
    //로그인 완료 메인으로~
    return res.redirect("/");
  } catch (error) {
    //여기 안에서 에러나면 catch로
    console.error(error);
    //app.js로 되돌림 얘를 호출한 데로 부르는거. return 되돌려~
    return next(error);
  }
});
//모듈 전체 라우터 사용하려고
module.exports = router;
