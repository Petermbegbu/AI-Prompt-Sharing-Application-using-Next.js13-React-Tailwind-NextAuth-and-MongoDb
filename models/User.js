import { Schema, model, models } from "mongoose";
import Email from "next-auth/providers/email";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exist"],
  },

  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
