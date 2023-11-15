const express = require("express");
const app = express();
const port = process.env.PORT || 2009;
const morgan = require('morgan');
const mongoose = require('mongoose');
const TASKS = require('./model/taskModel')
const connect = require('./db/mongoDB')  
require ('dotenv/config')



// custom middlewares
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}));
// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method',req.method);
//     next()
// })

// TESTING OUR MODEL AND DATABASE
// .save() method is a mongoose method for saving data to our database
app.get('/post-task',async(req,res)=>{
    const testData = new TASKS({
        name: 'Georges Jean',
        title: 'express ',
        tasks: 'we just started using mongoDB'
    })

    try{
        const newTask = await testData.save();
        res.status(201).send(newTask)

    }catch(error){
        console.log(error);
    }
})


// .find() method is a mongoose method for getting all the data from our database
app.get('/get-posts',async(req,res)=>{
    try{
        const getTasks = await TASKS.find();
        res.status(200).send(getTasks)

    }catch(error){
        console.log(error);
    }
})

// .findById() method is a mongoose method for finding a specific data from our database
app.get('/single-task', async(req,res)=>{
    try{
        const singleTask = await TASKS.findById('65523d7d5a40684396c56965');
        res.status(200).send(singleTask)

    }catch(error){
        console.log(error);
    }
})

// END OF DATABASE TEST

app.use(morgan('dev'))
app.use(express.static('public'))

// // routes
// app.get("/", (req, res) => {
// res.send("Welcome home")

// })
// const tasks =[
//     {name:'Halimat',title:'halimats clothing', task:'client deliveries this morning'},
//     {name:'Chimelu',title:'I.T experience', task:'to give my instructor my log book'},
//     {name:'George-Jean',title:'George-Jean Concept', task:'Trading and general contracts'}
// ];


//api
app.post('/api/v1/create',async(req,res)=>{
   // console.log(req.body);
    const newTasks = new TASKS(req.body)

try{
    await newTasks.save();
    res.status(201).redirect('/')
}catch(error){
    console.log(error);
}
});

//route params
app.get('/api/v1/route/:id',async(req,res)=>{
    // console.log(req.params.id);
    // console.log(id);
    const id = req.params.id
    try{
        const result = await TASKS.findById(id)
        res.status(200).render('singlePage', {title:'single || page', tasks:result})
    }catch(error){
        console.log(error);
    }
})

//page routes
app.get('/',async (req,res)=>{
   // res.render('index', {title:'Home || Page', task})
   try{
       const result = await  TASKS.find();
      res.render("index", {title: "Home || Page", tasks: result});
   }catch(error){
       console.log(error);
   };
})



app.get('/about', (req,res)=>{
    res.render('about',{title:'About || Page' })
})

app.get('/tasks', (req,res)=>{
    res.render('tasks',{title:'Task || Page' })
})

app.use( (req,res)=>{
    res.render('404',{title:'404 || Page' })
})

//db connection
connect()
.then(() =>{
    try{app.listen(port,()=>{
        console.log(`Server connected to http://localhost:${port}`);
    
    })

    }catch(error){
        console.log('cannot connect to the server');
    }
})
.catch((error)=>{
    console.log('invalid database connection...!', error);
})
