const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('PurchaseOrder', {
     orderId:{
         type:DataTypes.INTEGER(),
         autoIncrement: true,
         unique:true,
         allowNull:false,
         primaryKey:true,

     },
     date:{
         type:DataTypes.DATE(),
         allowNULL:false,
     },
    orderStatus:{
        type: DataTypes.ENUM(),
        values: ['Canceled', 'Submitted', 'Completed', 'Processing'] ,
        isDeleted: DataTypes.BOOLEAN(),
        allowNull:false,
    },
    orderStatusDetails: {
      type:DataTypes.STRING(),
      allowNull:false,
  }


  },{timestamps: true} );

};
