const jwtMiddleware = require('../middleware/jwt');
const userController = require('../controller/userController');
module.exports = (app, sequelize) => {
  app.use('/api/currentUser', (req, res, next) => {
    jwtMiddleware.verify(req, res, next);
  });
  app.get('/api/currentUser', (req, res) => {
    if (req.userType) {
      switch (req.userType) {
        case 'member':
          userController.getMember(sequelize, req.userID).then((member) => {
            res.send(member);
          });
          break;
        case 'employee':
          userController.getEmployee(sequelize, req.userID).then((employee) => {
            res.send(employee);
          });
          break;
        case 'admin':
          userController.getAdmin(sequelize, req.userID).then((admin) => {
            res.send(admin);
          });
          break;
      }
    } else {
      res.send(null);
    }
  });
  app.get('/api/allMember', (req, res) => {
    userController
      .getAllMember(sequelize)
      .then((member) => {
        res.send({
          status: 'ok',
          data: member,
        });
      })
      .catch((err) => {
        res.send({
          status: 'error',
          err,
        });
      });
  });
  app.get('/api/allEmployee', (req, res) => {
    userController
      .getAllEmployee(sequelize)
      .then((employee) => {
        res.send({
          status: 'ok',
          data: employee,
        });
      })
      .catch((err) => {
        res.send({
          status: 'error',
          err,
        });
      });
  });
  app.get('/api/allAdmin', (req, res) => {
    userController
      .getAllAdmin(sequelize)
      .then((admin) => {
        res.send({
          status: 'ok',
          data: admin,
        });
      })
      .catch((err) => {
        res.send({
          status: 'error',
          err,
        });
      });
  });
};
