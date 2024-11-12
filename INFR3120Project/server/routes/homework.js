var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Book = require('../model/report');
const book = require('../model/report');
let bookController = require('../controllers/homework.js')

router.get('/',async(req,res,next)=>{
    try{
        const Homeworks = await homework.find();
        res.render('homework/list',{
            title:'Homework',
            Homework:Homework
        })}
        catch(err){
            console.error(err);
            res.render('homework/list',{
                error:'Error on the server'
            })
        }
        });
router.get('/add',async(req,res,next)=>{
    try{
        res.render('homework/add',{
            title: 'Add Homework'
        })
    }
    catch(err)
    {
            console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});
router.post('/add',async(req,res,next)=>{
    try{
        let newHomework = Homework({
            "Name":req.body.Name,
            "Subject":req.body.Subject,
            "Due Date":req.body.Due_Date,
            "Description":req.body.Description,
        
        });
        Homework.create(newHomework).then(()=>{
            res.redirect('/homework');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const HomeworkToEdit= await Homework.findById(id);
        res.render('homework/edit',
            {
                title:'Edit Homework',
                Homework:HomeworkToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});       
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedHomework = Homework({
            "_id":id,
            "Name":req.body.Name,
            "Subject":req.body.Subject,
            "Due Date":req.body.Due_Date,
            "Description":req.body.Description,
        });
        Homework.findByIdAndUpdate(id,updatedHomework).then(()=>{
            res.redirect('/homework')
        })
    }
    catch(err){
        console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Homework.deleteOne({_id:id}).then(()=>{
            res.redirect('/homework')
        })
    }
    catch(error){
        console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;