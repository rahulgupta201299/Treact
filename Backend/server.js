import express from 'express'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const connection_url= 'mongodb+srv://rahul09091988:Venugopal@1234@cluster0.ron03.mongodb.net/MissionVision?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

//app config
const app=express()
const port=process.env.PORT || 9000
var __dirname = path.resolve()
//middlewares
//app.use(express.static(path.join(__dirname,'../build')))

//app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(cookieParser());
app.use(cors())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    next()
})
//DB config
app.use(express.json());
//api endpoints
app.use(express.static(path.join(__dirname,'../build')))
app.get('/:id',(req,res)=>{
    res.sendFile(path.join(__dirname,'../build','index.html'))
})
app.use(express.json());


const TeamCategory=mongoose.Schema({
    heading: String,
    order: Number,
})
const teamcategory=mongoose.model('teamcategory',TeamCategory)
const AllTeamMembers=mongoose.Schema({
    category: String,
    order: Number,
    image: String,
    positon: String,
    name: String,
    LinkedIn: String,
    ResearchScholar: String,
    Github: String,
})
const allteammembers=mongoose.model('allteammembers',AllTeamMembers)
app.get('/category/team',(req,res)=>{
    teamcategory.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/category/team/:id',(req,res)=>{
    allteammembers.find({category:req.params.id},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/TeamMember/:id',(req,res)=>{
    allteammembers.find({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/category/AllTeamMembers',(req,res)=>{
    allteammembers.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
const ProjectCategory=mongoose.Schema({
    category: String,
    order: Number,
})
const AllProject=mongoose.Schema({
    category: String,
    image: String,
    order: Number,
    name: String,
})
const projectcategory=mongoose.model('projectcategory',ProjectCategory)
const allproject=mongoose.model('allproject',AllProject)
app.get('/category/project',(req,res)=>{
    projectcategory.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/category/AllProject',(req,res)=>{
    allproject.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.post('/contact',(req,res)=>{
    const data=req.body
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
          user: 'rahulgupta201299@gmail.com',
          pass: 'rg810943@gmail.com'
        }
      });
      
      var mailOptions = {
        from: data.email,
        to: 'rahulgupta201299@gmail.com',
        subject: 'Form Query from Mission Vision',
        text: data.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).send(err)
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Email Sent: '+info.response)
        }
      });
})
app.listen(port,()=>console.log(`Listening on Localhost: ${port}`))

