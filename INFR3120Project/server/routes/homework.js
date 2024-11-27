var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

// telling my router that I have this model
let Homework = require('../models/report');
const homework = require('../models/report');

/* Read Operation --> Get route for displaying the homework list */
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
    
    router.post('/add',async(req,res,next)=>{
        try{
            let newHomework = Homework({
                "Name":req.body.Name,
                "Subject":req.body.Subject,
                "Date":req.body.Date,
                "Description":req.body.Description
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
            next(err);
        }
    });
    
    router.post('/edit/:id',async(req,res,next)=>{
        try{
            let id=req.params.id;
            let updatedHomework = Homework({
                "_id":id,
                "Name":req.body.Name,
                "Subject":req.body.Subject,
                "Date":req.body.Date,
                "Description":req.body.Description
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