const express = require('express');
const mongoose = require('mongoose');
const app = express();
//const portfolio = require('./models/portfolio');

//setting the view engine
app.set('view engine','ejs');
//for using static files
app.use(express.static('public'));

//index page
app.get('/',(req,res)=>{
    res.render('index',{title:"Website 101"});
})

app.get('/profile',(req,res)=>{
    res.render('profile',{title:"Profile"})
})

app.get('/create',(req,res)=>{
    res.render('create',{title:"Create a portfolio"});
})

app.use((req,res)=>{
    res.render('index',{title:"Oops"});
})

app.listen(4000);