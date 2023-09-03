import { Response } from "express";
import User from "../models/User";

const getUserProfileController = async (req: any, res: Response) => {
  try {
    const curUserId = req._id;

    const user = await User.findById(curUserId).populate("tasks");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { getUserProfileController };
