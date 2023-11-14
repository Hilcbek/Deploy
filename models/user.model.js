import mongoose from "mongoose";
let { model, Schema } = mongoose;
let UserSchema = new Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);
export default model('User',UserSchema)