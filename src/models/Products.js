const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Products', {
        id_product: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        authorized_refund: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false
        },
        price: {
            type: DataTypes.FLOAT(),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        is_offer: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false
        },
        variants: {
            type: DataTypes.JSON(),
            allowNull: false
        },
        sdelete: {
            type: DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: false
        },
        default_image: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        collection: {
            type: DataTypes.INTEGER(),
            allowNull: false
        }
    }, {timestamps: true});
}