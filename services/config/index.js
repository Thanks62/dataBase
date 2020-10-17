const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const { applyAssiociation } = require('./association');
const sequelize = new Sequelize('yunzhi', 'root', '123456', {
  localhost: 'localhost',
  dialect: 'mysql',
  port: 3306,
});
const Models = [
  require('../models/teacher'),
  require('../models/lesson'),
  require('../models/occupation'),
  require('../models/section'),
];
async function createAssiociation() {
  for (const model of Models) {
    model(sequelize, DataTypes);
  }
  applyAssiociation(sequelize);
  await sequelize.sync({ alter: true });
}
createAssiociation();
module.exports = sequelize;
