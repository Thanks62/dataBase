function applyAssiociation(sequelize) {
  const { Lesson, Teacher, Occupation, Section, Organization, Employee } = sequelize.models;
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
  Organization.hasMany(Employee, {
    foreignKey: 'orgID',
    sourceKey: 'orgID',
  });
  Employee.belongsTo(Organization, {
    foreignKey: 'orgID',
    sourceKey: 'orgID',
  });
  Organization.hasMany(Lesson, {
    foreignKey: 'orgID',
    sourceKey: 'orgID',
  });
  Lesson.belongsTo(Organization, {
    foreignKey: 'orgID',
    sourceKey: 'orgID',
  });
}
module.exports = { applyAssiociation };
