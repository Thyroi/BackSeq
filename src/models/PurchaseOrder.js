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
    orderStatus:{
        type: DataTypes.ENUM(),
        values: ['Canceled', 'Submited', 'Completed', 'Processing'],
        defaultValue:'Submited',
        isDeleted: DataTypes.BOOLEAN(),
        allowNull:false,
    },
    orderDetails: {
      type:DataTypes.JSON(),
      allowNull:false,
  },
  address:{
    type:DataTypes.JSON(),
    allowNull:true,
  }
  },
   {timestamps: true,
    updatedAt:false,
    ceratedAt: 'date',
} );

};
