const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Reviews', {
        review: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        stars: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
        description: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        }
    }, { timestamps: true });
};