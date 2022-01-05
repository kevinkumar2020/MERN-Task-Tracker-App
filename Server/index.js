const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const taskModel = require("./module/taskModel");

mongoose.connect("mongodb://localhost:27017/dbtask").then(()=>{
    console.log(`MogoDB Connected`);
});


app.get("/api/displayTask",async (req,res)=>{
    const taskdata = await taskModel.find();
    if(taskdata){
        res.json({data:taskdata});
    }
    else{
        res.json({data:"Data Not Found"});
    }
});

app.post("/api/insertTask",(req,res)=> {
    const taskdata = req.body;
    const task = taskModel.create(taskdata);
    if(task){
        res.json({data:"Task Added Successfully"});
    }
    else{
        res.json({data:"Task Added not Successfully"});
    }
});

app.delete("/api/deleteTask/:id",async (req,res)=>{
    const task = req.params.id;
    const deleteTask = await taskModel.findOneAndDelete({_id:task});
    if(deleteTask){
        res.json({data:"Task Deleted Successfully"});
    }
    else{
        res.json({data:"Task Deleted not Successfully"});
    }
})

app.put("/api/updateReminder/:id",async(req,res)=>{
    const taskid = req.params.id;
    const tempData = await taskModel.findOne({_id:taskid});
    const tempre = true;
    if(tempData.reminder == true){
        tempre = false;
    }
    else{
        tempre = true;
    }

    const updateReminder = await taskModel.findOneAndUpdate({
        _id:taskid},
        {reminder:tempre},
        {new:true}
        );
    if(updateReminder){
        res.json({data:"Reminder Change"});
    }
    else{
        res.json({data:"Reminder not Change"});
    }
});


app.listen(port, () => {
    console.log(`app running on ${port}`);
});
