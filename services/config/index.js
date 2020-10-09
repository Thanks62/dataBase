const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const { applyAssiociation } = require('./association');
const sequelize = new Sequelize('yunzhi', 'root', '123456', {
  localhost: 'localhost',
  dialect: 'mysql',
  port: 3306,
});
const Models = [require('../models/teacher'), require('../models/lesson')];
// async function createModel() {
//   for (const model of Models) {
//     await model(sequelize, DataTypes).sync({ alter: true });
//   }
// }
async function createAssiociation() {
  // await createModel();
  for (const model of Models) {
    model(sequelize, DataTypes);
  }
  applyAssiociation(sequelize);
  await sequelize.sync({ alter: true });
}
createAssiociation();
module.exports = sequelize;
