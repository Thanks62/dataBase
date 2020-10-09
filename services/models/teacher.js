module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Teacher', {
    teacherNo: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teacherImg: {
      type: DataTypes.TEXT,
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherIntro: {
      type: DataTypes.STRING,
    },
    teacherId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
// console.log('lesson', Lesson);
// Teacher.hasMany(Lesson);
// Teacher.sync({ alter: true });
// module.exports = Teacher;
