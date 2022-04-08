const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Review', {
        review: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        description: {
            type: DataTypes.TEXT(),
            allowNull: false,
        }
    }, { timestamps: true });
};