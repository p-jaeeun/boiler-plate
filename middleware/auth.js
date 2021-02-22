const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증처리를 하는 곳

  // client cookie에서 token을 가져온다.
  let token = req.cookies.x_auth;

  // token을 복호화한 후, 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ isAuth: false, error: true }); //클라이언트에 전달
    } else {
      req.token = token;
      req.user = user;
      next(); //미들웨어 다음단계로 진행! next()하지않으면 미들웨어에 갇히게 됨.
    }
  });
  // 유저가 있으면 인증 okay

  // 유저가 없으면 인증 No!
};

module.exports = { auth };
