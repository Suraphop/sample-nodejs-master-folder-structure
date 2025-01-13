module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define(
    "Level",
    {
      level_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      level: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Level;
};
