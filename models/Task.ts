import mongoose, { Document, ObjectId } from "mongoose";

interface taskSchemaInterface extends Document {
  owner: ObjectId;
  task: string;
}

const taskSchema = new mongoose.Schema<taskSchemaInterface>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Owner is required"],
  },
  task: {
    type: String,
    required: [true, "Task is required"],
  },
});

export default mongoose.model<taskSchemaInterface>("tasks", taskSchema);
