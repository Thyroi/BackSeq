const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('SearchTerms', {
        term: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, { timestamps: true });
};