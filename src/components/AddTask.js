import axios from "axios";
import { useEffect, useState } from "react";

const AddTask = () => {

    const [task,setTask] = useState([{
        task: "",
        date_time: "",
        reminder: true,
    }]);

    const [displayTask,setDisplayTask] = useState([]);

    useEffect(()=>{
        axios.get("api/displayTask").then((res)=>{
            setDisplayTask(res.data.data)
        });
    },[]);

    const addTask = () => {
        console.log(task);
        // axios.post("/api/insertTask", task).then((res) => { console.log(res.data);  });
    };

    const deleteTask = (id) =>{
        axios.delete(`/api/deleteTask/${id}`).then((res)=>{console.log(res.data);});
        axios.get("api/displayTask").then((res)=>{
            setDisplayTask(res.data.data)
        });
    }

    const updateReminder = (id)=>{
        axios.put(`/api/updateReminder/${id}`).then((res)=>{console.log(res.data);});
    };

    return (
        <div className="container">
            <h3>Task Tracker App</h3>
            <div className="table">
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Add Task</label>
                            <input type="text" onChange={(e) => setTask({...task,task:e.target.value}) } className="form-control" id="exampleFormControlInput1" placeholder="Add Task" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Date & Time</label>
                            <input type="text" onChange={(e) =>setTask({...task,date_time:e.target.value})} className="form-control" id="exampleFormControlInput1" placeholder="Date & Time" />
                        </div>
                        <div className="mb-3">
                        <input type="checkbox" onChange={(e) => { setTask({...task,reminder: e.currentTarget.checked}) }} checked/>&nbsp;&nbsp;&nbsp;
                        <label for="exampleFormControlInput1" className="form-label">Reminder</label>   
                        </div>
                        <div class="mb-3">
                            <button type="button" onClick={addTask} className="btn btn-primary">Submit</button>
                        </div>
                       
                    </div>
                </div>
            </div>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Task</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Reminder</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            {
                displayTask.map((item)=>{
                    return(
                        <tbody>
                        <tr>
                        <th scope="row">{item.task}</th>
                        <td>{item.date_time}</td>
                        <td>{item.reminder}</td>
                        <button type='submit' onClick={()=>{deleteTask(item._id)}}>Delete</button>
                        <button type='submit' onClick={()=>{updateReminder(item._id)}}>UpdateReminder</button>
                        </tr>
                    </tbody>
                    )
                })
            }
            
            </table>
        </div> 
    );
};

export default AddTask;