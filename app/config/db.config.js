const CreateAssociationOneToMany = (belongsToModel, hasManyModel, fk) => {
  belongsToModel.belongsTo(hasManyModel, {
    foreignKey: fk,
  });
  hasManyModel.hasMany(belongsToModel, {
    foreignKey: fk,
  });
};

const CreateAssociationOneToOne = (belongsToModel, hasOneModel, fk) => {
  belongsToModel.belongsTo(hasOneModel, {
    foreignKey: fk,
  });
  hasOneModel.hasOne(belongsToModel, {
    foreignKey: fk,
  });
};

module.exports = {
  // dialect: "mysql",
  dialect: "mssql",
  dialectOptions: {
    instance: "SQLEXPRESS",
    useUTC: "false",
    dateStrings: true,
    typeCast: true,
    timezone: "+07:00",
  },
  CreateAssociationOneToMany,
  CreateAssociationOneToOne,
};
