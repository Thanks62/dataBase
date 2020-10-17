module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Occupation', {
    occupationNo: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    occupationName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
