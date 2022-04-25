import { Document, Model, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
// TODO: Use it as an example
/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  avatar?: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
},
  { versionKey: false, timestamps: true, toJSON: { virtuals: true } }
);

// userSchema.virtual("todos", {
//   ref: "Todo",
//   foreignField: "userId",
//   localField: "_id"
// });

userSchema.methods.setPassword = function (user: IUser) {
  const { password } = user;
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = async function(password: string, user: IUser): Promise<Boolean> {
  return await bcrypt.compare(password, user.password);
};

export const User: Model<IUser> = model("User", userSchema);

