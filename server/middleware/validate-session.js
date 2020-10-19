const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const UserModel = require('../models/user');

const verifyFunc = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        let sessionToken = req.headers.authorization;
        console.log(sessionToken)
        if (!sessionToken) return res.status(403).send({ authorized: false, message: 'Must provide token.'});
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if(decoded){
                    UserModel.findOne({where: { id: decoded.id}}).then(user => {
                        req.user = user;
                        next();
                    },
                    function(){
                        res.status(401).send({error: "Not Authorized"});
                    });
                } else {
                    res.status(400).send({error: "Not Authorized"});
                }
            });
        }
    }
}

module.exports = verifyFunc; 