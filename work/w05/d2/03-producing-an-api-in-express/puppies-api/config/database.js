const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/puppies',
 {useNewUrlParser: true, useCreateIndex: true});
 
 const db = mongoose.connection;
 db.on('connected', function(){
   console.log(`Connected to MongoDB ${db.name} at ${db.host}`)
 });