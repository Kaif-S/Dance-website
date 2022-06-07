const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance').catch(err => console.error(err));
const bodyparser = require('body-parser')

//EXPRESS SPECEFIC STUFF
// app.use(express.static('static', Option));
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug')//Set the template engine as pug
app.set('views', path.join(__dirname,'views'))//set the view directory

//MONGOOSE SPECIFIC STUFF
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', ContactSchema);

//ENDPOINTS
app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req , res)=>{
    var MyData = new Contact(req.body)
    MyData.save().then(()=>{
        res.send("the data have been stored to data base succesfully")
    }).catch(()=>{
        res.status(404).send("the data has not saved to database")
    })
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`app has started succesfully on ${port}`);
});