const userController = require('../controller/userController');
const Token = require('../config/jwt');
module.exports = (app, sequelize) => {
  app.post('/api/register/member', (req, res) => {
    console.log(req.body);
    userController.addMember(sequelize, req.body).then(
      () => {
        res.send({
          status: 'ok',
        });
      },
      (err) => {
        res.send({
          status: 'error',
          message: err,
        });
      },
    );
  });
  app.get('/api/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0, httpOnly: true });
    res.send({
      status: 'ok',
      currentAuthority: 'guest',
    });
  });
  app.post('/api/login/userAccount', (req, res) => {
    userController.userLogin(sequelize, req.body).then((result) => {
      if (result) {
        Token.setToken(result, 'member').then((token) => {
          res.cookie('token', token, { maxAge: 60 * 60 * 48 * 1000, httpOnly: true });
          res.send({
            status: 'ok',
            message: '登录成功',
            currentAuthority: 'user',
            type: req.type,
            userInfo: result,
            token,
          });
        });
        return;
      } else {
        res.send({
          status: 'error',
          message: '登录失败',
          type: req.type,
          currentAuthority: 'guest',
        });
      }
    });
  });
  app.post('/api/login/employeeAccount', (req, res) => {
    userController.employeeLogin(sequelize, req.body).then((result) => {
      if (result) {
        Token.setToken(result, 'employee').then((token) => {
          res.cookie('token', token, { maxAge: 60 * 60 * 48, httpOnly: true });
          res.send({
            status: 'ok',
            message: '登录成功',
            currentAuthority: 'employee',
            type: req.type,
            userInfo: result,
            token,
          });
        });
        return;
      } else {
        res.send({
          status: 'error',
          message: '登录失败',
          type: req.type,
          currentAuthority: 'guest',
        });
      }
    });
  });
  app.post('/api/login/adminAccount', (req, res) => {
    userController.adminLogin(sequelize, req.body).then((result) => {
      if (result) {
        Token.setToken(result, 'admin').then((token) => {
          res.cookie('token', token, { maxAge: 60 * 60 * 48, httpOnly: true });
          res.send({
            status: 'ok',
            message: '登录成功',
            currentAuthority: 'admin',
            type: req.type,
            userInfo: result,
            token,
          });
        });
        return;
      } else {
        res.send({
          status: 'error',
          message: '登录失败',
          type: req.type,
          currentAuthority: 'guest',
        });
      }
    });
  });
};
