const express = require("express");
const app = express();
const PORT = 1016;
const morgan = require('morgan');
const mongoose = require('mongoose');
require ('dotenv/config')


const mongoDBUrl = process.env.DBURL
// custom middlewares
app.set('view engine', 'ejs')

// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method',req.method);
//     next()
// })

app.use(morgan('dev'))
app.use(express.static('public'))

// // routes
// app.get("/", (req, res) => {
// res.send("Welcome home")

// })
const tasks =[
    {name:'Halimat',title:'halimats clothing', task:'client deliveries this morning'},
    {name:'Chimelu',title:'I.T experience', task:'to give my instructor my log book'},
    {name:'George-Jean',title:'George-Jean Concept', task:'Trading and general contracts'}
]

app.get('/', (req,res)=>{
    res.render('index', {title:'Home || Page', tasks})
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
mongoose.connect('mongoDBUrl')
.then(() => console.log('Connected successfully!'));


app.listen(PORT, ()=>{
    console.log(`Server connected to http://localhost:${PORT}`);

})