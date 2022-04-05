const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Favorites', {
      id_user: {
          type: DataTypes.STRING(),
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      id_product: {
          type: DataTypes.INTEGER(),
          allowNull: false
      },
  }, { timestamps: false });
};