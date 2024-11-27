const mongoose = require('mongoose');

let homeworkModel = mongoose.Schema({
    Name: String,
    Subject: String,
    Date: String,
    Description: String
},
{
    collection:"homework"
});
module.exports = mongoose.model('Homework', homeworkModel);