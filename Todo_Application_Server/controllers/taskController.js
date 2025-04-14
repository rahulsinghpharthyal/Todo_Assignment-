import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import Task from "../models/taskSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const createTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;
  const task = await Task.create({
    title,
    description,
  });
  return res
    .status(200)
    .json({ success: true, message: "Todo Created", Data: task });
});

export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const  {id}  = req.params;
  const task = await Task.findByIdAndDelete({ _id: id });
  if (!task) return next(new ErrorHandler("Task Not Found", 400));
  return res.status(200).json({ success: true, message: "Task Deleted" });
});

export const updateTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const plainText = description.replace(/<[^>]+>/g, '');
  const updateTask = await Task.findByIdAndUpdate(
    {_id: id},
    {$set: { title, description: plainText}},
    {
      new: true,
      runValidators: true,
    }
  );
  // console.log('this is updated task', updateTask)
  return res
    .status(200)
    .json({ success: true, message: "Task Updated", Data: updateTask });
});

export const getMyTask = catchAsyncErrors(async (req, res, next) => {
  const tasks = await Task.find({});
  return res.status(200).json({
    tasks,
  });
});

export const getTaskById = catchAsyncErrors(async (req, res, next )=>{
  const {taskId} = req.params;
  const task = await Task.findById(taskId);

  return res.status(200).json({task})
})


