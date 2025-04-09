import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Enter Title'
    },
    description: {
        type: String,
        default: "Enter Description"
    },
},{timestamps: true});

const Task = mongoose.model('Task', taskSchema);

export default Task;