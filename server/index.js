require('dotenv').config();

const express = require('express')
const workoutLogApp = express();
const sequelize = require('./db');
const userRoute = require('./controllers/userController');
const logging = require('./controllers/logController');

workoutLogApp.use(express.json());
workoutLogApp.use(require('./middleware/headers'));

workoutLogApp.use("/user", userRoute)

/*******************************
 * Authorized logging routes
*******************************/

workoutLogApp.use(require('./middleware/validate-session'));
workoutLogApp.use('/authorized', logging);


sequelize.authenticate()
    .then( () => {
    console.log('Connection made');
    sequelize.sync();
    })
    .catch((err) => {
    console.error('Unable to connect to the database', err)
})

workoutLogApp.listen(3000, () => {
    console.log('App id listening on port 3000')
}); 