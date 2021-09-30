exports.isLoggedIn = (req, res, next) => {
  //req객체에 isAuthenticatedapted메서드추가.로그인중이면req.isAuthenticated()가 true고 그렇지않으면false
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
