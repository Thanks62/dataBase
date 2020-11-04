module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Organization', {
    orgID: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orgName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    orgAddress: {
      type: DataTypes.TEXT,
    },
    orgPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business: {
      type: DataTypes.TEXT,
    },
  });
};
