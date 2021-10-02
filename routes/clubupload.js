const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Club } = require("../models");
// const { isLoggedIn } = require("./middlewares");

const router = express.Router();

/* GET page. */
router.get("/", (req, res) => {
  res.render("clubupload");
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

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("인증 사진만 업로드 가능합니다.");
  }
}

router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post("/", upload2.none(), async (req, res, next) => {
  try {
    const club = await Club.create({
      content: req.body.content,
      img: req.body.url,
      // UserId: req.user.id,
    });
    res.redirect("/clubupload");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("인증 사진만 업로드 가능합니다.");
  }
}

module.exports = router;

// router.club("/img", isLoggedIn, upload.single("img"), (req, res) => {
//   console.log(req.file);
//   res.json({ url: `/img/${req.file.filename}` });
// });

// const upload2 = multer();
// router.club("/", isLoggedIn, upload2.none(), async (req, res, next) => {
//   try {
//     console.log(req.user);
//     const club = await Club.create({
//       content: req.body.content,
//       img: req.body.url,
//       UserId: req.user.id,
//     });
//     const hashtags = req.body.content.match(/#[^\s#]*/g);
//     if (hashtags) {
//       const result = await Promise.all(
//         hashtags.map((tag) => {
//           return Hashtag.findOrCreate({
//             where: { title: tag.slice(1).toLowerCase() },
//           });
//         })
//       );
//       await club.addHashtags(result.map((r) => r[0]));
//     }
//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });
