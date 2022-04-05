const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Invoice', {
      invoiceID: {
          type: DataTypes.INTEGER(),
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      invoice_date: {
        type: DataTypes.DATE(),
        allowNull: false
      },
      invoice_detail: {
        type: DataTypes.JSON(),
        allowNull: false
      },
      invoice_ammount: {
        type: DataTypes.FLOAT(),
        allowNull: false
      }

  }, { timestamps: false });
};
