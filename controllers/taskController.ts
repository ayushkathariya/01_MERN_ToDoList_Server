import { Response } from "express";
import User from "../models/User";
import Task from "../models/Task";

const createTaskController = async (req: any, res: Response) => {
  try {
    const curUserId = req._id;
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const user = await User.findById(curUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = await Task.create({ task, owner: curUserId });

    user.tasks.push(newTask._id);

    await user.save();

    return res.status(201).json({ newTask });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTaskController = async (req: any, res: Response) => {
  try {
    const curUserId = req._id;
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task id is required" });
    }

    const user = await User.findById(curUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Task.findByIdAndDelete(taskId);
    const taskIndex = await user.tasks.indexOf(taskId);
    user.tasks.splice(taskIndex, 1);
    await user.save();

    return res.status(201).json({ message: "Task Deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTaskController = async (req: any, res: Response) => {
  try {
    const curUserId = req._id;
    const { taskId, newTask } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task id is required" });
    }

    if (!newTask) {
      return res.status(400).json({ message: "New task is required" });
    }

    const user = await User.findById(curUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Task.findByIdAndUpdate(taskId, { task: newTask });

    return res.status(201).json({ message: "Task updated" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { createTaskController, deleteTaskController, updateTaskController };
