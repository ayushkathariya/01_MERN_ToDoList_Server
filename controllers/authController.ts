import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ message: "User is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User is not registered" });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    );

    return res.status(200).json({ accessToken });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export { signupController, loginController };
