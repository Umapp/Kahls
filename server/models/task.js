var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Task', new Schema({
    todos: [],
    taskDate: String
}))