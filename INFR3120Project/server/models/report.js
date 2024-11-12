const mongoose = require('mongoose');

let homeworks = mongoose.Schema({
    Name: String,
    Subject: String,
    Due_Date: String,
    Description: String
})
{
    collection:"Homeworks"
}
module.exports = mongoose.model('Homework', Homeworks);