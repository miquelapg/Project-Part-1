const mongoose = require('mongoose');

let homeworkModel = mongoose.Schema({
    Name: String,
    subject: String,
    Date: Number,
    Description: String
},
{
    collection:"homework"
});
module.exports = mongoose.model('Homework', homeworkModel);