import mongoose from "mongoose";
import { USER_ROLES } from "#shared/enums/enum.ts";

const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: USER_ROLES,
    default: "USER",
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const AuthModel = mongoose.model("User", userSchema);

export default AuthModel;
export { AuthModel as User };