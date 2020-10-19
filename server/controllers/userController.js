const UserModel = require('../models/user');
const sequelize = require('../db');
const { Router } = require('express');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const userControllerRouter = Router();

/***************************
 * USER REGISTER
***************************/
userControllerRouter.post('/register', (req, res) => {

    let { username, password } = req.body

    UserModel.create({
        username: username,
        passwordhash: bcrypt.hashSync(password, 10)
    }).then( (userData) => {
            let token = jwt.sign({id: userData.id}, process.env.JWT_SECRET, {expiresIn:'1d'});
            res.json({
                user: userData, 
                message: 'created',
                sessionToken: token
            });
        },
        (err) => {
            res.send(500, err.message);
        }) 
});

/***************************
 * USER LOGIN
***************************/
userControllerRouter.post('/login', (req, res) => {
    
    let { username, password } = req.body;

    UserModel.findOne({ where: { username: username}}).then(
        function(userData) {
            if(userData){

                bcrypt.compare(password, userData.passwordhash, (err, matches) =>{
                    if(matches){
                        let token = jwt.sign({id: userData.id}, process.env.JWT_SECRET, {expiresIn:'1d'});
                        res.json({
                            user: userData,
                            message: "You're Logged in!",
                            sessionToken: token
                        });
                    } else {
                        res.status(403).send({error: "Wrong password"});
                    }
                });
            } else {
                res.status(403).send({error: "No such user"})
            }
        },
        function(err) {
            res.status(500).send({error: "server error"})
        }
    );
});

module.exports = userControllerRouter;