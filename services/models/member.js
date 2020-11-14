module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Member', {
    memberID: {
      //会员id
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      //会员姓名
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      //会员昵称
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'column',
    },
    idNum: {
      //身份证号
      type: DataTypes.STRING,
      unique: 'column',
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexual: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    school: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: 'column',
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });
};
