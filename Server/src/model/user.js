import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  maidenName: String,
  age: Number,
  gender: String,
  address: {},
});

const User = mongoose.model("User", userSchema);

export default User;
