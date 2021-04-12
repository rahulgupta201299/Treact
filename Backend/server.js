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

app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Origin','*'),
    next()
})
//DB config

//api endpoints
app.use(express.static(path.join(__dirname,'../build')))
app.get('/:id',(req,res)=>{
    res.sendFile(path.join(__dirname,'../build','index.html'))
})
app.use(express.json());

const FacultySchema=mongoose.Schema({
    imageSrc: String,
    position: String,
    name: String,
    LinkedInUrl: String,
    GithubUrl: String,
    GoogleScholarUrl: String,
    ResearchGateUrl: String,
})
const Investigators=mongoose.model('Principal Investigators',FacultySchema)
const Researchers=mongoose.model('Researchers',FacultySchema)
const Graduate=mongoose.model('Graduate Students',FacultySchema)
const Administration=mongoose.model('Administration',FacultySchema)
const Alumni=mongoose.model('Alumni',FacultySchema)

/*app.post('/team/post',(req,res)=>{
    faculty.create(req.body,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})*/
app.get('/team/investigator',(req,res)=>{
    Investigators.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/investigator/:id',(req,res)=>{
    Investigators.find({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/graduate',(req,res)=>{
    Graduate.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/graduate/:id',(req,res)=>{
    Graduate.find({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/administration',(req,res)=>{
    Administration.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/administration/:id',(req,res)=>{
    Administration.find({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/researchers',(req,res)=>{
    Researchers.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/researchers/:id',(req,res)=>{
    Researchers.find({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/alumni',(req,res)=>{

    Alumni.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.get('/team/alumni/:id',(req,res)=>{

    Alumni.find({_id:req.params.id},(err,data)=>{
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
//listen
app.listen(port,()=>console.log(`Listening on Localhost: ${port}`))

/*

app.post('/v2/posts',(req,res)=>{
    const dbblog=req.body
    Blog.create(dbblog,(err,data)=>{
        if(err){
            res.send(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})
app.get('/v2/posts',(req,res)=>{
    Blog.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    }).sort({_id:-1})
})
const FacultySchema=mongoose.Schema({
    imageSrc: String,
    position: String,
    name: String
})
const faculty=mongoose.model('FacultiesDB',FacultySchema)
app.get('/faculties',(req,res)=>{
    faculty.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

*/