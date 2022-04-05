const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Invoice', {
      invoiceID: {
          type: DataTypes.INTEGER(),
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true
      }

  }, { timestamps: false });
};
