const express = require('express');
const path = require('path');
// 
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

const port = 8000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));




var contactList = [
    {
        name:"swaraj",
        phone:"1234569878"
    },
    {
        name:"Unkown",
        phone:"32598754897"
    },
    {
        name:"MY PC",
        phone:"14235670"
    }

];

app.get('/',function(req,res){
    return res.render('home',{
        title : "i am flying",
        contact_list : contactList
    });

});

app.get('/practice' , function(req,res){
    return res.render('practice',{
        title:"MY PRACTICE PAGE",
        
    })
});


app.post('/create-contact',function(req,res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },
    function(err,newContact){
        if(err){
            console.log('============================error in creating contact');
            return;
        }
        console.log('================',newContact);
        return res.redirect('back');
    });
    
});

//for deleting contact
app.get('/delete-contact',function(req,res){
    //get query from the url
    let phone = req.query.phone;
    
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1) {
        contactList.splice(contactIndex , 1);
    }
    return res.redirect('back');
});

app.listen(port,function(err)
{
    if(err){
        console.log("error in running the server:",err);
    }   
    console.log('yup! server is running on port:',port);
});