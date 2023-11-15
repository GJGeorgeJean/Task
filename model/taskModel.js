// Require mongoose
// From mongoose, we will use a method called Schema. This defines the structure of the document that we will store in the collection. Model is used to wrap the Schema and then send it to the Database.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true

    },
    tasks:{
        type:String,
        required: true
    }
},{timestamps:true});


// Let's create our model(Model is what surrounds the Schema and provides us with an interface by which to communicate with our database)

const TASK = mongoose.model('Task', taskSchema);
module.exports = TASK
