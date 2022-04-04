const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('PurchaseOrder', {
     orderId:{
         type:DataTypes.INTEGER,
         unique:true,
         allowNull:false,
         primaryKey:true,
     } ,
     date:{
         type:DataTypes.DATE,
         allowNULL:false,
     },
    orderStatus:{ 
        type: DataTypes.ENUM, 
        values: ['Canceled', 'Submitted', 'Completed', 'Processing'] ,
         isDeleted: DataTypes.BOOLEAN,
         allowNull:false,
    },
    orderStatusDetails: {
      type:DataTypes.STRING,
      allowNull:false,
  }


  },{timestamps: true} );
/*   Order.associate = function(models) {
    Order.hasMany(models.OrderItem);
    Order.belongsTo(models.Customer);
    Order.belongsTo(models.Cart);
  }; */

};
/* model orden_compra {
    id_orden_compra            Int                        @unique(map: "id_pedido") @default(autoincrement())
    cliente_id                 String                     @db.VarChar(255)
    fecha_orden                DateTime                   @db.Date
    transaccion_status         String                     @db.VarChar(50)
    transaccion_status_detalle String                     @db.VarChar(50)
    clientes                   clientes                   @relation(fields: [cliente_id], references: [phone], onDelete: Cascade, map: "Relationship3")
    carrito_items              carrito_items[]
    cliente_metodopago_orden   cliente_metodopago_orden[]
    envios                     envios[]
    facturas                   facturas[]
  
    @@id([id_orden_compra, cliente_id], map: "PK_orden_compra")
  }
   */