const mongoose = require('mongoose');

let homeworkModel = mongoose.Schema({
    Name: String,
    Subject: String,
    Due_Date: Number,
    Description: String
},
{
    collection:"homework"
});
module.exports = mongoose.model('Homework', homeworkModel);