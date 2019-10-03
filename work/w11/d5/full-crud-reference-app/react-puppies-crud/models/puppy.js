var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var puppySchema = new Schema({
  name: {type: String, required: true},
  breed: {type: String, default: 'Mixed'},
  age: {type: Number, default: 0}
},{
  timestamps: true
});

module.exports = mongoose.model('Puppy', puppySchema);