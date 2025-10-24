const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const indexRoutes = require("./routes/index");
const DatabaseConnection = require("./config/DatabaseConnection");

// ✅ Load environment variables
dotenv.config();

// ✅ Connect database
DatabaseConnection();

const app = express();
const PORT = process.env.PORT || 4001;

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "https://tinyz.vercel.app", // your frontend on vercel
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS blocked request from:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Tinyz backend is running 🚀");
});

// ✅ API routes
app.use("/api", indexRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
