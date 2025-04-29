import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: {
  type: String,
  default: "",
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "consultant"],
    required: true
  },
  photo: {
    type: String,
    default: ""
  },
  googleId: {
    type: String
  },
  
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
