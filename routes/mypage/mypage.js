const express = require("express");
const { User, Club } = require("../../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
// const fs = require('fs');
// const app : Express = express();

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map((f) => f.id)
    : [];
  next();
});

//프로필 사진 읽기
router.get("/", async (req, res, next) => {
  try {
    const getImage = await User.findOne({
      // where: { id: req.user.id }, // 여기서 id 에러창뜨고 로그인됨
      where: { id: `${req.user.id}` }, // 문자로 바꿈. 아마도. 암튼 개선함
    });
    console.log(getImage);
    res.render("mypage/mypage", {
      title: "mountain 커뮤니티",
      signupImages: getImage,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//회원계정 삭제 //가입되지않은 회원이라뜨는데db에는 남아있음..
router.get('/:id/delete',async (req,res,next)=>{

   try{
     const getID = await User.findOne({ where:{id: `${req.user.id}`}});
     await getID.destroy({ where:{id: `${req.user.id}`}});
     
     res.redirect('/');
   } catch (err){
     console.error(err);
     next(err);
   }
});

// //회원계정 삭제 //가입되지않은 회원이라뜨는데db에는 남아있음..
// router.get('/:id/delete',async (req,res,next)=>{

//    try{
//      const getID = await User.findOne({ where:{id: `${req.user.id}`}});
//      await getID.destroy({ id: req.user.id});
     
//      res.redirect('/');
//    }.then(()=>{
//      req.session.destroy((err)=>{
//        if(err){
//          res.status(400).send('you are currently not logined');
//        }else {
//          res.status(200).send('안전하게 퇼퇴');
//        }
//      });
//    }).catch((err)=>{
//      res.status(500).send('err');
//    })
// });

// router.route('/:id')
// .delete(User);


module.exports = router;
