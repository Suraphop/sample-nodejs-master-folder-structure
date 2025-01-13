module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    "Job",
    {
      job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      inventory_area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mr_request_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Job;
};
