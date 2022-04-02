const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('ProductsCategories', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        }
    }, {timestamps: false});
};