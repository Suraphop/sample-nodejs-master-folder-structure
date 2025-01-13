module.exports = (sequelize, DataTypes) => {
  const JobStatus = sequelize.define(
    "JobStatus",
    {
      job_status_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      job_status_process: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      job_status_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      process: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return JobStatus;
};
