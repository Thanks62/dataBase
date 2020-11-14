module.exports = (sequelize, DataTypes) => {
  return sequelize.define('lessonOrder', {
    lessonOrderNo: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      unique: 'column',
      autoIncrement: true,
    },
    lessonOrdTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lessonOrderScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lessonOrdStatus: {
      type: DataTypes.STRING,
      defaultValue: '已下单',
    },
    memberID: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
    },
    lessonID: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
    },
  });
};
