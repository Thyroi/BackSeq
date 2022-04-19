const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Shippings', {
    id_cart: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
 
      },);
};
