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
exports.fetchLesson = function fetchLesson(sequelize, req) {
  console.log('====', req);
  const { offset, limit } = req;
  return sequelize.models.Lesson.findAll({
    include: [
      {
        model: sequelize.models.Teacher,
      },
      {
        model: sequelize.models.Occupation,
      },
    ],
    offset: offset ? Number(offset) : null,
    limit: limit ? Number(limit) : null,
  });
};
exports.deleteLesson = function deleteLesson(sequelize, params) {
  const { id } = params;
  return sequelize.models.Lesson.destroy({ where: { LessonID: id } });
};
exports.editLesson = async function editLesson(sequelize, payload) {
  const { Lesson, Teacher, Occupation } = sequelize.models;
  const {
    lessonID,
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
  await Lesson.update(
    {
      lessonName,
      lessonLast,
      lessonBegin,
      lessonImg,
      lessonCost,
      lessonPeriod,
      lessonIntro: lessonIntro ? lessonIntro : null,
    },
    {
      where: { lessonID: lessonID },
    },
  );
  // const lesson = Lesson.findOne({ where: lessonID });
  // if (teacherId && (await lesson.getTeacher()).teacherId != teacherId) {
  //   lesson.getTeacher().removeLesson(lesson);
  //   const teacher = await Teacher.findOne({ where: { teacherId: teacherId } });
  //   teacher.addLessons(lesson);
  // }
  // if (occupationNo && (await lesson.getOccupation()).occupationNo != occupationNo) {
  //   console.log('change');
  //   lesson.getOccupation().removeLesson(lesson);
  //   const occupation = await Occupation.findOne({ where: { occupationNo: occupationNo } });
  //   occupation.addLessons(lesson);
  // }
};
