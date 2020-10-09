const teacherController = {
  getTeacher: function getTeacher(sequelize) {
    return sequelize.models.Teacher.findAll();
  },
  createTeacher: function createTeacher(sequelize, payload) {
    const { Teacher } = sequelize.models;
    const { teacherId, teacherName, teacherImg, teacherIntro } = payload;
    return Teacher.create({
      teacherId,
      teacherName,
      teacherImg: teacherImg ? teacherImg : null,
      teacherIntro: teacherIntro ? teacherIntro : null,
    });
  },
  addLesson: function addLesson() {},
  deleteTeacher: function deleteTeacher(sequelize, payload) {
    const { Teacher } = sequelize.models;
    return Teacher.destroy({ where: { teacherId: payload.id } });
  },
};
module.exports = teacherController;
