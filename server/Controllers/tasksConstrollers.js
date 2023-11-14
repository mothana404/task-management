// const users = require('./Models/users');
const task = require('../Models/tasks');
// const user = require('../Models/users');

async function addtask(req, res){
    try{
        const id = req.user.id;
        console.log(req.user.id);
    //     title,
    //   description,
    //   dueDate,
    //   priority,
    //   completed: false,
        const { title, description, dueDate, priority, completed } = req.body;
        const newtask = new task();
        newtask.task_name = title;
        newtask.task_body = description;
        newtask.Date = dueDate;
        newtask.task_priority = priority;
        newtask.task_status = completed;
        newtask.user_id = id;
        await newtask.save();
        res.status(201).json("added successfully");
    }catch(error){
        console.log("error in add task controller", error);
    }
};

async function updatetask(req, res){
    try{
        const id = req.params.id;
        const {task_body} = req.body;
        console.log(11111111111111111);
        const updatedtask = await task.findByIdAndUpdate(id, 
            {task_body},
            {new : true}
        );
        await updatedtask.save();
        res.status(201).json("updated successfully");
    }catch(error){
        console.log("error in update task controller");
    }
};

async function deletetask(req, res){
    try{
        const id = req.params.id;
        const deletedtask = await task.findByIdAndUpdate(id, {is_deleted : true}, {new : true});
        deletedtask.save();
        res.status(201).json("deleted successfully");
    }catch(error){
        console.log("error in delete task controller");
    }
};

async function gettask(req, res){
    try{
        
        const id = req.user.id;
        console.log(id);
        const all = await task.find({user_id : id});
        res.status(200).json(all);
    }catch(error){
        console.log(error);
    }
};

module.exports = {
    addtask,
    updatetask,
    deletetask,
    gettask
}