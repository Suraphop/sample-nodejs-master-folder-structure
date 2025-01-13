module.exports = (sequelize, DataTypes) => {
  const UnitPrice = sequelize.define(
    "UnitPrice",
    {
      unit_price_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      item_no: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return UnitPrice;
};
