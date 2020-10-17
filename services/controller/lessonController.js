exports.createLesson = async function createLesson(sequelize, payload) {
  const { Lesson, Teacher, Occupation } = sequelize.models;
  const {
    lessonName,
    lessonImg,
    lessonLast,
    lessonIntro,
    lessonBegin,
    lessonPeriod,
    lessonCost,
    teacherId,
    occupationNo,
  } = payload;
  const lesson = await Lesson.create({
    lessonName,
    lessonLast,
    lessonBegin,
    lessonImg,
    lessonCost,
    lessonPeriod,
    lessonIntro: lessonIntro ? lessonIntro : null,
  });
  if (occupationNo) {
    const occupation = await Occupation.findOne({ where: { occupationNo: occupationNo } });
    occupation.addLessons(lesson);
  }
  if (teacherId) {
    const teacher = await Teacher.findOne({ where: { teacherId: teacherId } });
    teacher.addLessons(lesson);
  }
  return lesson.lessonID;
};
exports.fetchLesson = function fetchLesson(sequelize) {
  return sequelize.models.Lesson.findAll({
    include: sequelize.models.Teacher,
    include: sequelize.models.Occupation,
  });
};
exports.deleteLesson = function deleteLesson(sequelize, params) {
  const { id } = params;
  return sequelize.models.Lesson.destroy({ where: { LessonID: id } });
};
