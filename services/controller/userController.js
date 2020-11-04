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
  const { Administrator, Organization } = sequelize.models;
  const admin = await Administrator.findOne({
    include: [
      {
        model: Organization,
      },
    ],
    where: { adminPhone: userName },
  });
  if (admin && admin.adminPassword == password) return admin;
  return false;
};
