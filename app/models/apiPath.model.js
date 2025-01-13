module.exports = (sequelize, DataTypes) => {
  const ApiPath = sequelize.define(
    "ApiPath",
    {
      api_path_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      api_process: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      api_path: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return ApiPath;
};
