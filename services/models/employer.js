module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Employee', {
    employeeID: {
      //职员id
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeePhone: {
      type: DataTypes.STRING,
      unique: 'column',
    },
    employeePassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 职员工号
    employeeNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'column',
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });
};
