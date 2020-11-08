const jwt = require('jsonwebtoken');
const screctKey = 'yun-zhi';
exports.setToken = function (userInfo, type) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      {
        userID: userInfo.employeeID || userInfo.adminID || userInfo.memberID,
        type,
      },
      screctKey,
      { expiresIn: 60 * 60 * 24 * 2 },
    );
    console.log('token', token);
    resolve(token);
  });
};
exports.veriToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, screctKey, (err, decoded) => {
      if (err) {
        console.log('err', err);
        reject(err);
      } else {
        console.log('info', decoded);
        resolve(decoded);
      }
    });
  });
};
