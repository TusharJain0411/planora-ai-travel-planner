import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      default: null,
    },
    theme: {
      type: Boolean,
      default: false, // false = light, true = dark
    },

    photo: String,

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
