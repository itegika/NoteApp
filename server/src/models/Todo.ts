import { Document, Model, model, Schema } from "mongoose";
// TODO: Use it as an example
/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface ITodo extends Document {
  title: string;
  description: string;
  year: number;
  isCompleted: boolean;
  isPublic: boolean;
  userId?: string;
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true
  },
  year: {
    type: Number,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  userId: {
      type: String,
    },
},
{ versionKey: false, timestamps: true }
);

export const Todo: Model<ITodo> = model("Todo", todoSchema);




