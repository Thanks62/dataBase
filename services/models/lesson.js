module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Lesson', {
    lessonID: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lessonName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lessonLast: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lessonBegin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lessonStuNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lessonImg: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lessonIntro: {
      type: DataTypes.STRING,
    },
    lessonCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: '必须为整数',
        },
      },
    },
    lessonPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: '必须为整数',
        },
      },
    },
    lessonScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
