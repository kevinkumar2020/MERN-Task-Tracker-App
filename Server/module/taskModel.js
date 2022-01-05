const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    date_time:{
         type:String,
         required:true
    },
    reminder:{
        type:Boolean,
        required:true
    }
});

const taskModel = mongoose.model("task",taskSchema);

module.exports = taskModel;