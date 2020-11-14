const Token = require('../config/jwt');
exports.verify = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  Token.veriToken(token).then(
    (res) => {
      req.userID = res.userID;
      req.userType = res.type;
      console.log('======', res.type);
      return next();
    },
    (err) => {
      res.status(401).send({
        status: 'error',
        message: '验证失败，请重新登录',
        error: err,
      });
    },
  );
};
