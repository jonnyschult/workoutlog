const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserModel = sequelize.define('user', {
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = UserModel