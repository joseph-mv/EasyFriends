import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  place: string;
  hobbies: string[];
  email: string;
  friends: string[];
  sendRequests: string[];
  getRequests: string[];
  password: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  dob: { type: String },
  gender: { type: String },
  country: { type: String },
  state: { type: String },
  place: { type: String },
  hobbies: { type: [String] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: { type: [mongoose.Schema.Types.ObjectId] },
  sendRequests: { type: [mongoose.Schema.Types.ObjectId] },
  getRequests: { type: [mongoose.Schema.Types.ObjectId] },
  createdAt: { type: Date, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
