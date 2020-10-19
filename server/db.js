const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize('WorkoutLogProject', 'jonny', 'Letmein1234!', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;