exports.createSection = async function (sequelize, payload) {
  const { Section, Lesson } = sequelize.models;
  const { sectionName, duration, order, url, lessonID } = payload;
  const section = await Section.create({
    sectionName,
    duration,
    url,
    order,
  });
  const lesson = await Lesson.findOne({ where: { lessonID } });
  lesson.addSections(section);
};
exports.deleteSection = async function (sequelize, payload) {
  const { Section } = sequelize.models;
  const { sectionID } = payload;
  await Section.destroy({ where: { sectionID } });
};
exports.getSection = async function (sequelize, payload) {
  const { Section, Lesson } = sequelize.models;
  return await Section.findAll({
    include: Lesson,
    where: { lessonID: payload.lessonID },
    order: ['order'],
  });
};
