const orgController = require('../controller/orgController');
module.exports = (app, sequelize) => {
  app.get('/api/org', (req, res) => {
    orgController.getOrg(sequelize, req.query).then(
      (data) => {
        res.send({
          status: 'ok',
          data,
        });
      },
      (err) => {
        res.send({
          status: 'error',
          err,
        });
      },
    );
  });
  app.post('/api/org', (req, res) => {
    orgController.editOrg(sequelize, req.body).then(
      () => {
        res.send({
          status: 'ok',
        });
      },
      (err) => {
        res.send({
          status: 'error',
          err,
        });
      },
    );
  });
};
