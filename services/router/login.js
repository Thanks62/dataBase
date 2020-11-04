const userController = require('../controller/userController');
module.exports = (app, sequelize) => {
  app.post('/api/login/userAccount', (req, res) => {
    userController.userLogin(sequelize, req.body).then((result) => {
      if (result) {
        res.send({
          status: 'ok',
          message: '登录成功',
          currentAuthority: 'user',
          type: req.type,
          userInfo: result,
        });
        return;
      }
      res.send({
        status: 'error',
        message: '登录失败',
        type: req.type,
        currentAuthority: 'guest',
      });
    });
  });
  app.post('/api/login/employeeAccount', (req, res) => {
    userController.employeeLogin(sequelize, req.body).then((result) => {
      if (result) {
        res.send({
          status: 'ok',
          message: '登录成功',
          currentAuthority: 'employee',
          type: req.type,
          userInfo: result,
        });
        return;
      }
      res.send({
        status: 'error',
        message: '登录失败',
        type: req.type,
        currentAuthority: 'guest',
      });
    });
  });
  app.post('/api/login/adminAccount', (req, res) => {
    userController.adminLogin(sequelize, req.body).then((result) => {
      if (result) {
        res.send({
          status: 'ok',
          message: '登录成功',
          currentAuthority: 'admin',
          type: req.type,
          userInfo: result,
        });
        return;
      }
      res.send({
        status: 'error',
        message: '登录失败',
        type: req.type,
        currentAuthority: 'guest',
      });
    });
  });
};
