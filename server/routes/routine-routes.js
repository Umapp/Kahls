var express = require('express');
var Routine = require('../models/routine');
var Task = require('../models/task');
var moment = require('moment')

module.exports = (function () {
    var app = express.Router();
    moment.locale('sv');
    
    app.get('/task/today', function (req, res) {
        var today = moment().format('YYYY-MM-DD');
        Task.find({ taskDate: today }, function (err, task) {
            if(!task.length){
                var weekday = moment().format('dddd');
                weekday = weekday.substr(0,1).toUpperCase() + weekday.substr(1);
                Routine.find({
                    $and : [
                        { $or: [{occurence: 'Morgon'}, {occurence: 'Stängning'}, {occurence: 'Varje dag'}, {occurence: weekday}]}
                    ]}, function (err, resRoutines) {
                    task = new Task({routines: resRoutines, taskDate: today })
                    task.save(function (err) {
                        if (err)
                            console.log(err)
                    res.json(task[0].routines)
                    });
                })
            }
            else{
                res.json(task[0].routines);
            }

        }, function(err){
            console.log(err);
        })
    })
    
    app.put('/task/today/:id', function(req,res){
        var today = moment().format('YYYY-MM-DD');
        var now = moment().format('hh:mm:ss');
        
        Task.findOne({ taskDate: today }, function(err, task){
            task.routines.forEach(function(routine){
                if(routine._id == req.params.id){
                    routine.completedBy = req.body.user;
                    routine.completedTime = now;
                }
            })
            task.save(function(err, res){
                console.log(err, res);
            })
            res.json('Done');
        })
    })


    app.get('/routines', function (req, res) {
        Routine.find({}, function (err, routines) {
            res.json(routines);
        })
    });

    app.post('/routine', function (req, res) {
        var routine = new Routine(req.body);
        
        routine.save(function (err) {
            if (err)
                console.log(err)
            //console.log(err);
            res.json('Saved')
        });
    });

    app.delete('/routine/:id', function (req, res) {
        Routine.remove({ _id: req.params.id }, (err) => {
            res.json('Removed')
        });
    });

    app.put('/routine/:id', function (req, res) {
        Routine.findById(req.params.id, (err, routine) => {
            if (err) {
                res.send(err);
            }

            routine.title = req.body.title;
            routine.category = req.body.category;
            routine.occurence = req.body.occurence;

            routine.save((err) => {
                if (err) {
                    res.send(err);
                }
                res.json('Updated');
            })
        })
    })

    return app;
})();