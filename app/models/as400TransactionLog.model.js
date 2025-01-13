module.exports = (sequelize, DataTypes) => {
  const AS400TransactionLog = sequelize.define(
    "AS400TransactionLog",
    {
      as400_transaction_log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      process: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      sub_process: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      remark: {
        type: DataTypes.STRING("MAX"),
      },
    },
    {
      freezeTableName: true,
    }
  );
  return AS400TransactionLog;
};
