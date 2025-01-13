module.exports = (sequelize, DataTypes) => {
  const Division = sequelize.define(
    "Division",
    {
      division_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      division_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      division_code_as400_short: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: true,
      },
      division_code_as400_full: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Division;
};
