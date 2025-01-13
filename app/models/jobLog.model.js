module.exports = (sequelize, DataTypes) => {
  const JobLog = sequelize.define(
    "JobLog",
    {
      job_log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      inventory_area_no: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      job_status_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      pallet_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      box_no: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      item_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      quantity_per_box: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return JobLog;
};
