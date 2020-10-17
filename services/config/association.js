function applyAssiociation(sequelize) {
  const { Lesson, Teacher, Occupation, Section } = sequelize.models;
  Lesson.belongsTo(Teacher, {
    foreignKey: 'teacherNo',
    sourceKey: 'teacherNo',
  });
  Teacher.hasMany(Lesson, {
    foreignKey: 'teacherNo',
    sourceKey: 'teacherNo',
  });
  Occupation.hasMany(Lesson, {
    foreignKey: 'occupationNo',
    sourceKey: 'occupationNo',
  });
  Lesson.belongsTo(Occupation, {
    foreignKey: 'occupationNo',
    sourceKey: 'occupationNo',
  });
  Lesson.hasMany(Section, {
    foreignKey: 'lessonID',
    sourceKey: 'lessonID',
  });
  Section.belongsTo(Lesson, {
    foreignKey: 'lessonID',
    sourceKey: 'lessonID',
  });
}
module.exports = { applyAssiociation };
