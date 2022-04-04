
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('Cart', {
        id_cart:{ 
        type:DataTypes.INTEGER(),
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true,

       },
    /*   cartStatus: { 
          type: DataTypes.ENUM,
           values: ['Open', 'CheckedOut'] }, */
     cart_items:{
          type: DataTypes.JSON(),
          allowNull:true,
        },    
      
    },{timestamps:false}
    );}

  
  /*   sequelize.define('Cart', {


  }, );
  Cart.associate = function(models) {
    Cart.hasMany(models.Product);
    Cart.belongsTo(models.Order);
  }; 

};*/

/* model carrito_items {
  id_carrito_items      Int          @unique(map: "id_pedido_items") @default(autoincrement())
  orden_compra_id       Int
  carrito_item_cantidad Int
  carrito_item_precio   Decimal      @db.Decimal(11, 2)
  product_id            Int
  orden_compra          orden_compra? @relation(fields: [orden_compra_id], references: [id_orden_compra], onDelete: Cascade, map: "Relationship34")
  Product               Product      @relation(fields: [product_id], references: [id_product], onDelete: Cascade, map: "Relationship33")
  envios                envios[] */
  
  
  
  /*  quantity:{ 
       type:DataTypes.INTEGER,  
       defaultValue:DataTypes.UUIDV1,
       allowNull:false,
       primaryKey:true
    },
   cartStatus: { 
       type: DataTypes.ENUM,
        values: ['Open', 'CheckedOut'] }, */