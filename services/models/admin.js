module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Administrator', {
    adminID: {
      //职员id
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    adminName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminPhone: {
      type: DataTypes.STRING,
      unique: 'column',
    },
    adminPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 职员工号
    adminNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'column',
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });
};
