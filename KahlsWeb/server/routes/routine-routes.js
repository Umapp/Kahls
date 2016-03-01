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
            if(err)
            console.log(err)
            //console.log(err);
            res.json('Saved')
        });
    });
    
    return app;
})();