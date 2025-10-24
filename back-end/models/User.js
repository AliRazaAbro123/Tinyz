const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9_]+$/, // ✅ use 'match' instead of 'enum'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // ✅ valid email regex
  },
  password: {
    type: String, // ✅ must be 'String' (not 'string')
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // ✅ Optional: If a user can have multiple URLs, store them as an array
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
