

import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
          type: Boolean,
          default: false,
        },
        img: { type: String },
      },
      { timestamps: true }
)

export default mongoose.model("Users",userSchema)