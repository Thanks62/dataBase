exports.userLogin = async function (sequelize, params) {
  const { userName, password } = params;
  const { Member } = sequelize.models;
  const member = await Member.findOne({
    where: { userPhone: userName },
  });
  if (member && member.userPassword == password) return member;
  return false;
};
exports.employeeLogin = async function (sequelize, params) {
  const { userName, password } = params;
  const { Employee } = sequelize.models;
  const employer = await Employee.findOne({
    where: { employeePhone: userName },
  });
  if (employer && employer.employeePassword == password) return employer;
  return false;
};
exports.adminLogin = async function (sequelize, params) {
  const { userName, password } = params;
  const { Administrator } = sequelize.models;
  const admin = await Administrator.findOne({
    where: { adminPhone: userName },
  });
  if (admin && admin.adminPassword == password) return admin;
  return false;
};
exports.getMember = async function (sequelize, userID) {
  const { Member } = sequelize.models;
  const member = await Member.findOne({
    where: { memberID: userID },
  });
  if (member) return member;
  return false;
};
exports.getAllMember = async function (sequelize) {
  const { Member } = sequelize.models;
  return await Member.findAll();
};
exports.getEmployee = async function (sequelize, userID) {
  const { Employee, Organization } = sequelize.models;
  const employer = await Employee.findOne({
    include: [
      {
        model: Organization,
      },
    ],
    where: { employeeID: userID },
  });
  if (employer) return employer;
  return false;
};
exports.getAllEmployee = async function (sequelize) {
  const { Employee, Organization } = sequelize.models;
  return await Employee.findAll({
    include: [
      {
        model: Organization,
      },
    ],
  });
};
exports.getAdmin = async function (sequelize, userID) {
  const { Administrator } = sequelize.models;
  const admin = await Administrator.findOne({
    where: { adminID: userID },
  });
  if (admin) return admin;
  return false;
};
exports.getAllAdmin = async function (sequelize) {
  const { Administrator } = sequelize.models;
  return await Administrator.findAll();
};
exports.addMember = async function (sequelize, payload) {
  const { Member } = sequelize.models;
  await Member.create({
    ...payload,
  });
};
