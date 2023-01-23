
var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
const res = require("express/lib/response");
mongoose.connect('mongodb://localhost:27017/ONESTOP');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
console.log("connection succeeded");})
var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
 extended: true
}));
app.post('/form', function(req,res){
 var name = req.body.name;
 var email =req.body.email;
 var password = req.body.password;
 var data = {
 "name": name,
 "email":email,
 "password":password,
 }
 db.collection('enterpreneur').insertOne(data,function(err, collection){
    if (err) throw err;
    console.log("Record inserted Successfully"); 
    return 'successfull';
   });
   return res.redirect('http://127.0.0.1:5502/signup_success.html');
})

   app.get('/',function(req,res){
   res.set({
    'Access-control-Allow-Origin': '*'
   });
   return res.redirect('form.html');
   }).listen(3001)
   console.log("server listening at port 3000");
