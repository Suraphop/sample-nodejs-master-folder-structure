module.exports = (sequelize, DataTypes) => {
  const MRRequest = sequelize.define(
    "MRRequest",
    {
      mr_request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      mr_no: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      mr_no_date: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      mr_no_increment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_no: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      destination_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      stock_request_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      stock_request_time: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return MRRequest;
};
