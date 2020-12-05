exports.getOrg = async function (sequelize, payload) {
  const { Organization } = sequelize.models;
  const { orgID } = payload;
  let condition = orgID ? { orgID: orgID } : {};
  return await Organization.findAll({
    where: condition,
  });
};
exports.editOrg = async function (sequelize, payload) {
  const { Organization } = sequelize.models;
  const { orgID, ...rest } = payload;
  return await Organization.update(
    {
      ...rest,
    },
    {
      where: { orgID: orgID },
    },
  );
};
