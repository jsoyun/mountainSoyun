const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Club } = require("../../models");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

/* GET page. */
router.get("/", (req, res) => {
  res.render("club/clubupload");
});

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
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

router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const club = await Club.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/club");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.get('/hashtag', isLoggedIn, async (req, res, next) => {
//   const query = req.query.hashtag;

//   if(!query) {
//       res.redirect('/');
//   }
//   try {
//       const hashtag = await Hashtag.findOne({where: {title: query}});
//       let posts = [];
//       if(hashtag) {
//         posts = await hashtag.getPosts({include: [{model: User}]});
//       }

//       return res.render('club/club', {
//         title: `${query} | mountain`,
//         twits: posts,
//       });
//   } catch (err) {
//       console.error(err);
//       return next(err);
//   }
// });

module.exports = router;
