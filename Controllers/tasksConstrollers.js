// const users = require('./Models/users');
const task = require('../Models/tasks');
// const user = require('../Models/users');

async function addtask(req, res){
    try{
        const id = req.user.id;
        console.log(req.user);
        const { task_name, task_body, Date, task_status, task_priority} = req.body;
        const newtask = new task();
        newtask.task_name = task_name;
        newtask.task_body = task_body;
        newtask.Date = Date;
        newtask.task_priority = task_priority;
        newtask.task_status = task_status;
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
        const { task_name, task_body, Date, task_status, task_priority} = req.body;
        const updatedtask = await task.findByIdAndUpdate(id, 
            {task_name, task_body, Date, task_status, task_priority},
            {new : true}
        );
        // await updatedtask.save();
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