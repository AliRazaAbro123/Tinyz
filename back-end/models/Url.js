const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: [
    {
      timeStamp: { type: Date },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Optional: For logged-in user systems later
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

module.exports = mongoose.model("Url", urlSchema);
