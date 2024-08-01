import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title : {type: String, required: true},
    description :{type: String, required: true},
    type : {type: String, required: true},
    createdOn : {type: String, required: true}, 
    status : {type: String, required: true}
});

export const TaskModel = mongoose.model('Task', TaskSchema);

export const getTasks = () => TaskModel.find();
export const getTasksbyID = (id: string) => TaskModel.findById(id);
export const createTask = (values: Record<string, any>) => new TaskModel(values).save().then((task) => task.toObject()); 
export const deleteTaskByID = (id: string) =>TaskModel.findOneAndDelete({_id: id});
export const updateTaskByID = (id: string, values: Record<string, any>)=> TaskModel.findByIdAndUpdate(id, values);