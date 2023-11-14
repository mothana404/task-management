const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    task_name: {
        type: String,
        required: true,
      },
      task_body: {
        type: String,
      },
      Date: {
        type: Date,
      },
      task_status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
      },
      task_priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
      is_deleted : {
        type: Boolean,
        default: false,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
});
const task = mongoose.model("task", taskSchema);
module.exports = task;