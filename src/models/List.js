const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('List', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        List: {
            type: DataTypes.JSONB(),
            allowNull: true
        },
        Colaborators: {
            type: DataTypes.JSONB(),
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(),
            allowNull: false,
        }
    }, { timestamps: true });
};