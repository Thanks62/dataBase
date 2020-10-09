function applyAssiociation(sequelize) {
  const { Lesson, Teacher } = sequelize.models;
  Lesson.belongsTo(Teacher, {
    foreignKey: 'teacherNo',
    sourceKey: 'teacherNo',
  });
  Teacher.hasMany(Lesson, {
    foreignKey: 'teacherNo',
    sourceKey: 'teacherNo',
  });
}
module.exports = { applyAssiociation };
