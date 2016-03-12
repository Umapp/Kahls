var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Task', new Schema({
    taskDate: String,
    routines: [{
        title: String,
        category: String,
        occurence: String,
        completedBy: String,
        completedTime: String
    }]
}))