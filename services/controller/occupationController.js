exports.createOccupation = function createOccupation(sequelize, payload) {
  const { Occupation } = sequelize.models;
  return Occupation.create({
    occupationName: payload.occupationName,
  });
};
exports.getOccupation = function getOccupation(sequelize) {
  const { Occupation } = sequelize.models;
  return Occupation.findAll();
};
exports.deleteOccupation = function deleteOccupation(sequelize, payload) {
  const { Occupation } = sequelize.models;
  return Occupation.destroy({ where: { occupationNo: payload.occupationNo } });
};
