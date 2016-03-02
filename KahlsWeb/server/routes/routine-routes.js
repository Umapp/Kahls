var express = require('express');
var Routine = require('../models/routine');

module.exports = (function () {
    var app = express.Router();

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