const { DataTypes, STRING } = require('sequelize');
const crypto = require('crypto');

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
        return this.getDataValue('login_name') === null || this.getDataValue('login_name') === "" ? "Anonymous" : this.getDataValue('login_name')
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
    isRegistered: {
      type: DataTypes.BOOLEAN(),
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false
    },
    token: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "algo"
    },
    newsletter: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false
    }
  }, { timestamps: false });
};
