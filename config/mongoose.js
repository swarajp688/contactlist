const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');

const db =mongoose.connection;

db.on('error' , console.error.bind(console,'error connecting yo db'));

db.once('open'  ,function(){
    console.log('succesfully connected to databse');
});