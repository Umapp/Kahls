var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Routine', new Schema({
    title: String,
    category: String,
    occurence: String,
}))