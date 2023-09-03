import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);

export default router;
