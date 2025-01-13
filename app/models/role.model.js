module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Role;
};
