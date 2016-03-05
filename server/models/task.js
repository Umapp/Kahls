var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Task', new Schema({
    taskDate: String,
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Routine'
    }]
}))