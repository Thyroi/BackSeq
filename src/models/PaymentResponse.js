const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('PaymentResponse', {
    id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
   
    status: {
        type:DataTypes.STRING(),
    },
    status_detail: {
        type:DataTypes.STRING(),


    }
 
      }, { timestamps: false });
};
