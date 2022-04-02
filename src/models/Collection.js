const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Collection', {
      id_collection: {
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