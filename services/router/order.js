const lessonOrderController = require('../controller/lessonOrderController');
module.exports = (app, sequelize) => {
  app.post('/api/lessonOrder', (req, res) => {
    lessonOrderController.createOrder(sequelize, req.body).then(
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
  app.get('/api/lessonOrder', (req, res) => {
    lessonOrderController.getOrder(sequelize, req.query).then(
      (data) => {
        res.send({
          status: 'ok',
          data,
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
};
