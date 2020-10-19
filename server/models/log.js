const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const LogModel = sequelize.define('Log', {
    description:{
        type: DataTypes.STRING,
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = LogModel