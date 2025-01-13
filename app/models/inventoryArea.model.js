module.exports = (sequelize, DataTypes) => {
  const InventoryArea = sequelize.define(
    "InventoryArea",
    {
      inventory_area_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      inventory_area_code: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
      },
      rack: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      bay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shelf: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return InventoryArea;
};
