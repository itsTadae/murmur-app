const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require("fs");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePic: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1592837377640-be21d91199d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1337&q=80",
  },
  followers: [Schema.Types.ObjectId],
  following: [Schema.Types.ObjectId],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    } catch (err) {
      next(err);
    }

    next();
  }
});

userSchema.methods.isProperPassword = function (clientPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(clientPassword, this.password);
      resolve(isMatch);
    } catch (err) {
      console.log(err, "Error in BCrypt Password Comparison");
      reject(err);
    }
  });
};

mongoose.model("User", userSchema);
