const lessonController = require('../controller/lessonController');
const teacherController = require('../controller/teacherController');
const sectionController = require('../controller/sectionController');

module.exports = (app, sequelize) => {
  app.post('/api/getLesson', (req, res) => {
    console.log('----', req.query);
    lessonController
      .fetchLesson(sequelize, req.query)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.post('/api/createLesson', (req, res) => {
    lessonController
      .createLesson(sequelize, req.body)
      .then((id) => {
        res.status(200).send({
          lessonID: id,
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.get('/api/deleteLesson', (req, res) => {
    lessonController
      .deleteLesson(sequelize, req.query)
      .then(() => {
        res.status(200).send({
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.post('/api/editLesson', (req, res) => {
    lessonController
      .editLesson(sequelize, req.body)
      .then(() => {
        res.status(200).send({
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.get('/api/getSection', (req, res) => {
    sectionController
      .getSection(sequelize, req.query)
      .then((data) => {
        res.status(200).send({ status: 200, data });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.post('/api/createSection', (req, res) => {
    sectionController
      .createSection(sequelize, req.body)
      .then(() => {
        res.status(200).send({
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.get('/api/deleteSection', (req, res) => {
    sectionController
      .deleteSection(sequelize, req.query)
      .then(() => {
        res.status(200).send({
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.post('/api/getTeacher', (req, res) => {
    teacherController
      .getTeacher(sequelize)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.post('/api/createTeacher', (req, res) => {
    teacherController
      .createTeacher(sequelize, req.body)
      .then(() => {
        res.send({
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.get('/api/deleteTeacher', (req, res) => {
    teacherController
      .deleteTeacher(sequelize, req.query)
      .then(() => {
        res.status(200).send({
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.post('/api/editTeacher', (req, res) => {
    teacherController
      .editTeacher(sequelize, req.body)
      .then(() => {
        res.status(200).send({
          status: 200,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};
