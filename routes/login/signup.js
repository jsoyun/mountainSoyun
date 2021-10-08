//모듈
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isNotLoggedIn } = require("../middlewares");

//라우터
const router = express.Router();

//회원가입 창띄우기(get)
router.get("/", (req, res, next) => {
  res.render("login/signup", { title: "회원가입" });
});

// 회원가입 데이터 입력한거 전송하는 코드
// 여기로 이동! signUp 들어왔을때 뒤에 실행
// post 데이터들 있어서(post데이터 전송)
router.post("/",isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password, img } = req.body;
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
      img: req.body.url,
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

// uploads 폴더
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

/* multer 기본 설정 */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 게시글 IMG CREATE */
router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);

  res.json({ url: `/img/${req.file.filename}` });
});

/* 게시글 TEXT CREATE */
router.post("/", upload.none(), async (req, res, next) => {
  try {
    await User.create({
      // nick: req.body.nick,
      img: req.body.url,
    });
    res.redirect("/signup");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//모듈 전체 라우터 사용하려고
module.exports = router;
