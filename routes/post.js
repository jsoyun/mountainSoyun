//게시글 저장 여기는 데이터베이스에 직접 이미지 넣는게 아니라 이미지 경로만 저장함!
//이미지는 서버디스크에 저장됨!

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads폴더를 생성합니다");
  fs.mkdirSync("uploads");
}

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
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img 라우터
router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  //이미지 하나 업로드받은뒤 이미지의 저장경로를 클라이언트로 응답
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
// POST /post 라우터   . 게시글 업로드 처리하는 라우터
//이미지데이터가 들어있지 않아서 none메서드 사용함.(이미지 주소가 불러온것임)
router.post("/", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    //게시글내용에서 정규표현식으로 추출해냄
    //추철한 해시태그는 데이터 베이스에 저장
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          //저장할때 쓰는 메서드
          return Hashtag.findOrCreate({
            //slice(1).toLowerCase()를 사용해 해시태그에서 #를 떼고 소문자로 바꿈
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      //해시태그 모델들을 post.addHashtags메서드로 게시글과 연결
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
