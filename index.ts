import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./utils/connectDb";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";
import taskRouter from "./routers/taskRouter";

const app: Application = express();

// Configuration
app.use(express.json());
dotenv.config({ path: ".env" });
app.use(
  cors({
    origin: "https://zero1-mern-todolist-client.onrender.com",
    credentials: true,
  })
);
connectDb();

// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello from server" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
