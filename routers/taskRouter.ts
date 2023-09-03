import express from "express";
import verifyUser from "../middlewares/requireUser";
import {
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from "../controllers/taskController";

const router = express.Router();

router.post("/", verifyUser, createTaskController);
router.delete("/", verifyUser, deleteTaskController);
router.put("/", verifyUser, updateTaskController);

export default router;
