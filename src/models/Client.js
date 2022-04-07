const { DataTypes, STRING } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Client', {
      phone: {
          type: DataTypes.BIGINT(),
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      email: {
          type: DataTypes.STRING(),
          allowNull: false,
          unique: true,
          //primaryKey: true,
      },
      login_name: {
        type: DataTypes.STRING(),
         get() {
          return this.getDataValue('login_name')===null? "Anonymous": this.getDataValue('login_name')
        }, 
        allowNull: true,
        unique: true,

      },
      login_password: {
        type: DataTypes.STRING(),
        allowNull: true,
        unique: false,
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      address: {
        type: DataTypes.JSON(),
        allowNull: false
      },
      isRegistered:{
        type:DataTypes.BOOLEAN(),
        allowNull:true,
        /* set(value) {
           this.setDataValue('isRegistered',this.login_name!==""&&this.login_name!==null?value=true:value=false)
        },  */
      }
      
  }, { timestamps: false });
};
