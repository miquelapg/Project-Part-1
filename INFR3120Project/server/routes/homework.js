var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Homework = require('../models/report.js');
//const book = require('../model/report.js');
let homeworkController = require('../controllers/homework.js')
/* Get route for the book list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const HomeworkList = await Homework.find();
    res.render('Homework/list',{
        title:'Homework',
        HomeworkList:HomeworkList
    })}
    catch(err){
        console.error(err);
        res.render('Homework/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Homework/add',{
            title: 'Add Homework'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Homework/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newHomework = Homework({
            "Name":req.body.Name,
            "Subject":req.body.Subject,
            "Due Date":req.body.Date,
            "Description":req.body.Description,
           
        });
        Homework.create(newHomework).then(()=>{
            res.redirect('/homeworklist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Homework/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const homeworkToEdit= await Homework.findById(id);
        res.render('Homework/edit',
            {
                title:'Edit Homework',
                Homework:homeworkToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedHomework = Homework({
            "_id":id,
            "Name":req.body.Name,
            "Subject":req.body.Subject,
            "Due Date":req.body.Date,
            "Description":req.body.Description,
           
        });
        Homework.findByIdAndUpdate(id,updatedHomework).then(()=>{
            res.redirect('/homeworklist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Homework/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Homework.deleteOne({_id:id}).then(()=>{
            res.redirect('/homeworklist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Homework/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;