function applyAssiociation(sequelize) {
  const {
    Lesson,
    Teacher,
    Member,
    Occupation,
    Section,
    Organization,
    Employee,
    lessonOrder,
  } = sequelize.models;
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
  Lesson.hasMany(lessonOrder, {
    foreignKey: 'lessonID',
    sourceKey: 'lessonID',
  });
  lessonOrder.belongsTo(Lesson, {
    foreignKey: 'lessonID',
    sourceKey: 'lessonID',
  });
  Member.hasMany(lessonOrder, {
    foreignKey: 'memberID',
    sourceKey: 'memberID',
  });
  lessonOrder.belongsTo(Member, {
    foreignKey: 'memberID',
    sourceKey: 'memberID',
  });
}
module.exports = { applyAssiociation };
