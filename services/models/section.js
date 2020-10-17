module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Section', {
    sectionID: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sectionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
