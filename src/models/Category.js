const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Category', {
      id_category: {
          type: DataTypes.INTEGER(),
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      name: {
          type: DataTypes.STRING(),
          allowNull: false
      }
  }, { timestamps: false });
};