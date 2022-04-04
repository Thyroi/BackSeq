const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('Client', {
      phone:{ 
        type:DataTypes.STRING(),  
        unique:true,
        allowNull:false,
        primaryKey:true
       },
     email:{
          type: DataTypes.STRING(),
          allowNull:false,

        },
      name:{
          type: DataTypes.STRING(),
          allowNull:false,
        
        },
     lastname:{
            type: DataTypes.STRING(),
            allowNull:false,  
          },
     login_name:{
            type: DataTypes.STRING(),
            allowNull:false, 
            unique:true, 
          },      
    login_password:{
            type: DataTypes.STRING(),
            allowNull:false, 

          },
    address:{
            type: DataTypes.JSON(),
            allowNull:false, 
             
          },                 
      
    },{timestamps:false}
    );}
