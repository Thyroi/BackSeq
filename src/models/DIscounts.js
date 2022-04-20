const {DataTypes} = require('sequelize');

module.exports = (sequelize) => { 
    sequelize.define('Discounts', {
        code: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        discount: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        state: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: true
        }
    }, 
    { timestamps: false });
};
