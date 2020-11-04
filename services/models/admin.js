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
      unique: true,
    },
    adminPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 职员工号
    adminNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });
};
