import mongoose, { Document, ObjectId } from "mongoose";

interface userSchemaInterface extends Document {
  name: string;
  email: string;
  password: string;
  tasks: ObjectId[];
}

const userSchema = new mongoose.Schema<userSchemaInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
  ],
});

export default mongoose.model<userSchemaInterface>("users", userSchema);
