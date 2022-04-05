const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Cart', {
    id_cart: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    cart_items: {
      type: DataTypes.JSON(),
      allowNull: true
    }
      }, { timestamps: false });
};
