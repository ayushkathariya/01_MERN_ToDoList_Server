import express from "express";
import verifyUser from "../middlewares/requireUser";
import { getUserProfileController } from "../controllers/userController";

const router = express.Router();

router.get("/", verifyUser, getUserProfileController);

export default router;
