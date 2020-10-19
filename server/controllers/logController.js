const LogModel = require('../models/log'); 
const sequelize = require('../db');
const { Router } = require('express');

let logControllerRouter = Router();

/************************
 * LOG WORKOUT
************************/
logControllerRouter.post('/post', (req, res) => {
    let owner = req.user.id;
    // console.log(req.user.id);
    let des = req.body.description;
    let def = req.body.definition;
    let rslt = req.body.result;

    LogModel.create({
        description: des,
        definition: def,
        result: rslt,
        owner_id: owner
    })
    .then(
        function createSuccess(postContentRes) {
            res.json({post: postContentRes});
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

/*****************************
* SHOW ALL WORKOUTS
*****************************/
logControllerRouter.get('/getall', (req, res) =>{
    let userid = req.user.id;

    LogModel
    .findAll({
        where: {owner_id: userid}
    }).then(
        function findAllSuccess(data){
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

/*****************************
* SHOW ONE WORKOUT
*****************************/
logControllerRouter.get('/:id', (req, res) => {
    let userid = req.user.id;
    let postid = req.params.id;

    LogModel
    .findOne({
        where: {id: postid, owner_id: userid, }
    }).then(
        function findAllSuccess(data){
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

/*****************************
* UPDATE WORKOUT
*****************************/
logControllerRouter.put('/:id', (req, res) => {
    let postid = req.params.id;
    let des = req.body.description;
    let def = req.body.definition;
    let rslt = req.body.result;


    LogModel
    .update({
        description: des,
        definition: def,
        result: rslt,
    },
    {where: {id: postid}}
    ).then(
        function updateSuccess(data){
            res.json({
            description: des,
            definition: def,
            result: rslt, 
            });
        },        
        function updateError(err) {
            res.send(500, err.message);
        }
    )
})

/*****************************
* DELETE WORKOUT
*****************************/
logControllerRouter.delete('/:id', (req, res) => {
    let postid = req.params.id;
    let userid = req.user.id;    

    LogModel
    .destroy({
        where: {id: postid, owner_id: userid}
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed the workout")
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    )
})

module.exports = logControllerRouter;