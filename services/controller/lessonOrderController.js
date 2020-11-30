exports.createOrder = async function createOrder(sequelize, payload) {
  const { lessonOrder, Lesson } = sequelize.models;
  const { lessonID } = payload;
  await lessonOrder.create({
    ...payload,
  });
  console.log(lessonID);
  const lesson = await Lesson.findOne({ where: { lessonID: lessonID } });
  console.log(lesson);
  await lesson.increment('lessonStuNum');
};
exports.getOrder = async function getOrder(sequelize, payload) {
  const { lessonOrder, Organization, Lesson, Member } = sequelize.models;
  const { lessonID, orgID, memberID } = payload;
  let conditionLesson = lessonID ? { lessonID: lessonID } : {};
  let conditionOrg = orgID ? { orgID: orgID } : {};
  let conditionMember = memberID ? { memberID: memberID } : {};
  return await lessonOrder.findAll({
    where: conditionMember,
    include: [
      {
        model: Lesson,
        where: conditionLesson,
        include: [
          {
            model: Organization,
            where: conditionOrg,
          },
        ],
      },
      {
        model: Member,
      },
    ],
  });
};
