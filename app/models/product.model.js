module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      pallet_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      pallet_no_date: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      pallet_no_increment: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      box_no: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      item_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      item_name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      po_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      invoice_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      supplier_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      supplier_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      mfg_lot_no: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      quantity_per_box: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Product;
};
