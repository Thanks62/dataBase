exports.createLesson = async function createLesson(sequelize, payload) {
  const { Lesson, Teacher } = sequelize.models;
  const lesson = await Lesson.create({
    lessonName: payload.lessonName,
    lessonLast: payload.lessonLast,
    lessonBegin: payload.lessonBegin,
    lessonImg: payload.lessonImg,
    lessonCost: payload.lessonCost,
    lessonPeriod: payload.lessonPeriod,
    lessonIntro: payload.lessonIntro ? payload.lessonIntro : null,
  });
  if (payload.teacherId) {
    const teacher = await Teacher.findOne({ where: { teacherId: payload.teacherId } });
    teacher.addLessons(lesson);
  }
};
exports.fetchLesson = function fetchLesson(sequelize) {
  return sequelize.models.Lesson.findAll({
    include: sequelize.models.Teacher,
  });
};
exports.deleteLesson = function deleteLesson(sequelize, params) {
  const { id } = params;
  return sequelize.models.Lesson.destroy({ where: { LessonID: id } });
};
