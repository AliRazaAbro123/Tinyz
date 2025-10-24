const mongoose = require("mongoose");

/**
 * Establishes a MongoDB connection using Mongoose
 * Supports flexible local and production environments.
 */
async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MongoDB connection failed: URI is not defined.");
    process.exit(1);
  }

  try {
    // Recommended connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      connectTimeoutMS: 10000,
    };

    const connection = await mongoose.connect(uri, options);

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);

    // Optional: log reconnection and disconnection events
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Trying to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔁 MongoDB reconnected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("❌ Initial MongoDB connection failed:", error);
    process.exit(1);
  }
}

module.exports = connectDatabase;
