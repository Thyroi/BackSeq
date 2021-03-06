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
        price_offer: {
            type: DataTypes.FLOAT(),
            allowNull: true
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
            type: DataTypes.JSONB(),
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
        },
        reviews: {
            type: DataTypes.INTEGER(),
            defaultValue: 0,
            allowNull: true,
        },
        reviews_score: {
            type: DataTypes.FLOAT(),
            defaultValue: 0,
            allowNull: true
        },
        rating: {
            type: DataTypes.VIRTUAL(),
            get() {
                const score = this.getDataValue('reviews_score');
                const total = this.getDataValue('reviews');
                return score? score/total: 0;
            }
        }
    }, {timestamps: true});
}