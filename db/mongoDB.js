const mongoose = require('mongoose');
require('dotenv/config');

const mongoDBUrl = process.env.DBURL

const connect = async()=>{
    try{
        await mongoose.connect(mongoDBUrl,{
           // useNewUrlParser:true,
            //useUnifiedTopology:true,
        })
        console.log('mongoDB connected successfully');

    }catch(error){
        console.log(error);
    }
}

module.exports = connect
