var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var performerSchema = new Schema({
  name: {type: String, required: true, unique: true},
  born: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Performer', performerSchema);