const mongoose = require('mongoose');

let Homeworks = mongoose.Schema({
    Name: String,
    Subject: String,
    Due_Date: String,
    Description: String
})
{
    collection:"Homeworks"
}
module.exports = mongoose.model('Homework', Homeworks);